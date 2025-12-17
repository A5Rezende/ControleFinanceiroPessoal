from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Category
from .serializers import CategorySerializer


class CategoryView(viewsets.ModelViewSet):
    """
    ViewSet responsável pelo CRUD de categorias financeiras.

    Regras aplicadas:
    - Apenas usuários autenticados podem acessar
    - Cada usuário visualiza apenas suas próprias categorias
    - O usuário da categoria é definido automaticamente no backend
    """

    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna apenas as categorias pertencentes
        ao usuário autenticado.
        """
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Associa automaticamente a categoria ao usuário logado,
        impedindo manipulação do campo 'user' pelo cliente.
        """
        serializer.save(user=self.request.user)

    @action(
        detail=False,
        methods=["get"],
        url_path=r"categorias-tipo/(?P<tipo>[01])"
    )
    def categorias_tipo(self, request, tipo=None):
        """
        Endpoint customizado para listar categorias por tipo.

        Parâmetros:
        - tipo = 1 → Entrada
        - tipo = 0 → Saída

        Retorna apenas categorias do usuário autenticado.
        """

        # Converte o parâmetro recebido na URL para boolean
        tipo_bool = bool(int(tipo))

        categorias = Category.objects.filter(
            user=request.user,
            type=tipo_bool
        )

        serializer = CategorySerializer(categorias, many=True)
        return Response(serializer.data)
