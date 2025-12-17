from django.db import models
from django.contrib.auth.models import User


class Record(models.Model):
    """
    Representa um registro financeiro do usuário.

    Um registro pode ser:
    - Uma entrada (ex: salário, reembolso)
    - Uma saída (ex: aluguel, mercado)

    Cada registro pertence a um usuário e está
    obrigatoriamente associado a uma categoria.
    """

    # Descrição do registro financeiro
    # Ex: "Salário Janeiro", "Conta de Luz"
    name = models.CharField(max_length=100)

    # Valor monetário do registro
    # Utiliza Decimal para evitar erros de precisão
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    # Data do registro financeiro
    date = models.DateField()

    # Indica se o valor já foi pago (saída)
    # ou recebido (entrada)
    paid = models.BooleanField(default=False)

    # Categoria associada ao registro
    # Ex: Alimentação, Salário, Aluguel
    category = models.ForeignKey(
        'categories.Category',
        on_delete=models.CASCADE
    )

    # Usuário dono do registro
    # Garante isolamento de dados entre usuários
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        """
        Representação textual do registro,
        útil no Django Admin e em logs.
        """
        return f"{self.name} - R$ {self.value}"
