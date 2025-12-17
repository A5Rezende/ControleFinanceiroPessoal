from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer responsável pelo registro de novos usuários.

    Realiza:
    - Validação dos dados de cadastro
    - Criação segura do usuário utilizando create_user
    - Proteção do campo password (write_only)
    """

    # Campo de senha apenas para escrita (não retorna no response)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User

        # Campos necessários para o cadastro
        fields = ("username", "email", "password")

    def create(self, validated_data):
        """
        Cria um novo usuário aplicando as validações e
        criptografia de senha do Django.
        """
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para representação de usuários existentes.

    Utilizado principalmente para:
    - Retornar dados básicos do usuário autenticado
    - Evitar exposição de informações sensíveis
    """

    class Meta:
        model = User

        # Campos públicos do usuário
        fields = ("id", "username", "email")
