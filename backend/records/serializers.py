from rest_framework import serializers
from .models import Record
from categories.serializers import CategorySerializer


class RecordSerializer(serializers.ModelSerializer):
    """
    Serializer responsável pelos registros financeiros.

    Funcionalidades:
    - Retornar os dados do registro em formato JSON
    - Exibir a categoria de forma detalhada (read_only)
    - Receber apenas o ID da categoria na criação/edição
    - Garantir que o usuário não seja alterado pelo cliente
    """

    # Retorna a categoria completa no GET (id, nome, tipo, etc.)
    category = CategorySerializer(read_only=True)

    # Recebe apenas o ID da categoria no POST/PUT
    # Evita a necessidade de enviar o objeto completo
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Record

        # Expõe todos os campos do modelo
        fields = "__all__"

        # O usuário é definido automaticamente no backend
        read_only_fields = ("user",)
