from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    """
    View responsável pelo registro de novos usuários.

    Utiliza:
    - CreateAPIView para lidar automaticamente com POST
    - RegisterSerializer para validação e criação do usuário

    Endpoint público (não requer autenticação).
    """

    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveAPIView):
    """
    View responsável por retornar os dados do usuário autenticado.

    Utiliza:
    - RetrieveAPIView para retornar um único objeto
    - UserSerializer para expor apenas dados seguros
    - Autenticação obrigatória (IsAuthenticated)

    Retorna sempre o usuário presente no request.
    """

    serializer_class = UserSerializer

    # Garante que apenas usuários autenticados possam acessar o perfil
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Retorna o usuário autenticado associado à requisição.
        """
        return self.request.user
