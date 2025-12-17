from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.db.models import Sum, Case, When, DecimalField
from django.db.models.functions import ExtractMonth, ExtractYear

from .models import Record
from .serializers import RecordSerializer


class RecordView(viewsets.ModelViewSet):
    """
    ViewSet responsável por gerenciar os registros financeiros do usuário.

    Funcionalidades principais:
    - CRUD completo de registros financeiros
    - Filtros automáticos por usuário autenticado
    - Endpoints customizados para geração de relatórios (mensal, anual, por categoria)
    """

    serializer_class = RecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna apenas os registros pertencentes ao usuário autenticado.
        Garante isolamento de dados entre usuários.
        """
        return Record.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Associa automaticamente o registro ao usuário autenticado
        no momento da criação.
        """
        serializer.save(user=self.request.user)

    # =========================
    # RELATÓRIOS E CONSULTAS
    # =========================

    @action(detail=False, methods=["get"], url_path="anos-informados")
    def anos_informados(self, request):
        """
        Retorna uma lista de anos que possuem registros financeiros
        cadastrados pelo usuário.
        """
        anos = (
            Record.objects
            .filter(user=request.user)
            .annotate(ano=ExtractYear("date"))
            .values_list("ano", flat=True)
            .distinct()
            .order_by("-ano")
        )

        return Response(list(anos))

    @action(detail=False, methods=["get"], url_path="valores-mensais-ano/(?P<ano>[0-9]{4})")
    def valores_mensais_ano(self, request, ano=None):
        """
        Retorna os valores mensais de entradas e gastos
        de um determinado ano.
        """
        ano = int(ano)

        queryset = (
            Record.objects
            .filter(user=request.user, date__year=ano)
            .annotate(mes=ExtractMonth("date"))
            .values("mes")
            .annotate(
                gastos=Sum(
                    Case(
                        When(category__type=False, then="value"),
                        default=0,
                        output_field=DecimalField()
                    )
                ),
                entradas=Sum(
                    Case(
                        When(category__type=True, then="value"),
                        default=0,
                        output_field=DecimalField()
                    )
                )
            )
            .order_by("mes")
        )

        meses = [
            {
                "mes": item["mes"],
                "gastos": float(item["gastos"] or 0),
                "entradas": float(item["entradas"] or 0)
            }
            for item in queryset
        ]

        return Response(meses)

    @action(detail=False, methods=["get"], url_path="categorias-mes/(?P<ano>[0-9]{4})/(?P<mes>[0-9]{1,2})")
    def categorias_mes(self, request, ano=None, mes=None):
        """
        Retorna o total de valores agrupados por categoria
        em um determinado mês e ano.

        A resposta é separada em entradas e saídas.
        """
        ano = int(ano)
        mes = int(mes)

        queryset = (
            Record.objects
            .filter(user=request.user, date__year=ano, date__month=mes)
            .values("category__name", "category__type")
            .annotate(total=Sum("value"))
            .order_by("-total")
        )

        entradas = []
        saidas = []

        for item in queryset:
            bloco = {
                "categoria": item["category__name"],
                "total": float(item["total"])
            }

            if item["category__type"]:
                entradas.append(bloco)
            else:
                saidas.append(bloco)

        return Response({
            "entradas": entradas,
            "saidas": saidas
        })

    @action(detail=False, methods=["get"], url_path="meses-informados/(?P<ano>[0-9]{4})")
    def meses_informados(self, request, ano=None):
        """
        Retorna os meses que possuem registros
        dentro de um determinado ano.
        """
        ano = int(ano)

        meses = (
            Record.objects
            .filter(user=request.user, date__year=ano)
            .annotate(mes=ExtractMonth("date"))
            .values_list("mes", flat=True)
            .distinct()
            .order_by("mes")
        )

        return Response(list(meses))

    @action(detail=False, methods=["get"], url_path="valores-anos")
    def valores_anos(self, request):
        """
        Retorna o total de entradas e gastos
        agrupados por ano.
        """
        queryset = (
            Record.objects
            .filter(user=request.user)
            .annotate(ano=ExtractYear("date"))
            .values("ano")
            .annotate(
                gastos=Sum(
                    Case(
                        When(category__type=False, then="value"),
                        default=0,
                        output_field=DecimalField()
                    )
                ),
                entradas=Sum(
                    Case(
                        When(category__type=True, then="value"),
                        default=0,
                        output_field=DecimalField()
                    )
                )
            )
            .order_by("ano")
        )

        anos = [
            {
                "ano": item["ano"],
                "gastos": float(item["gastos"] or 0),
                "entradas": float(item["entradas"] or 0)
            }
            for item in queryset
        ]

        return Response(anos)
