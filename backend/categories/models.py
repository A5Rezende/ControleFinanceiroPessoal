from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    """
    Representa uma categoria financeira criada pelo usuário.

    A categoria pode ser:
    - Entrada (type=True)
    - Saída (type=False)

    Cada categoria pertence exclusivamente a um usuário,
    garantindo isolamento dos dados no sistema.
    """

    # Nome da categoria (ex: Alimentação, Salário, Aluguel)
    name = models.CharField(max_length=100)

    # Define o tipo da categoria:
    # True  → Entrada
    # False → Saída
    type = models.BooleanField(default=False)

    # Usuário dono da categoria
    # Se o usuário for removido, todas as suas categorias também serão excluídas
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        """
        Representação textual da categoria,
        útil no Django Admin e em logs.
        """
        return f"{self.name} ({'Entrada' if self.type else 'Saída'})"
