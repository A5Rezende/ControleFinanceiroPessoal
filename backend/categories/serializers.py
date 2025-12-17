from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer responsável por:
    - Converter dados do modelo Category para JSON
    - Validar dados recebidos da API
    - Garantir que o campo 'user' não seja alterado pelo cliente
    """

    class Meta:
        model = Category

        # Expõe todos os campos do modelo
        fields = "__all__"

        # O usuário é definido automaticamente no backend,
        # evitando que o cliente associe categorias a outro usuário
        read_only_fields = ("user",)
