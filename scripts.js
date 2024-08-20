document.addEventListener('DOMContentLoaded', () => {
    // Variáveis para armazenar o total e o carrinho
    let total = 0;
    const cartItems = {};

    // Função para atualizar o total da sacola
    function updateTotal() {
        const totalElement = document.getElementById('vlrTotal');
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Função para adicionar um item ao carrinho
    function addItem(name, price) {
        if (!cartItems[name]) {
            cartItems[name] = { quantity: 0, price: price };
        }
        cartItems[name].quantity += 1;
        total += price;

        // Atualiza o total e o conteúdo da sacola
        updateTotal();
        updateCart();
    }

    // Função para atualizar a lista de itens no carrinho
    function updateCart() {
        const itemsContainer = document.getElementById('itens');
        itemsContainer.innerHTML = '';

        for (const [name, item] of Object.entries(cartItems)) {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.dataset.name = name;

            itemElement.innerHTML = `
                <div class="descSacola">${name}</div>
                <div class="quantidade">${item.quantity}</div>
                <div class="vlrSacola">R$ ${item.price.toFixed(2)}</div>
                <div class="totItem vlrSacola">R$ ${(item.price * item.quantity).toFixed(2)}</div>
                <div class="btnRemover">
                    <button class="remove">REMOVER</button>
                </div>
            `;

            itemsContainer.appendChild(itemElement);
        }

        // Adiciona o evento de remover item a cada botão "REMOVER"
        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemElement = event.target.closest('.item');
                const itemName = itemElement.dataset.name;

                if (cartItems[itemName]) {
                    const itemPrice = cartItems[itemName].price;
                    if (cartItems[itemName].quantity > 1) {
                        cartItems[itemName].quantity -= 1;
                        total -= itemPrice;
                    } else {
                        delete cartItems[itemName];
                        total -= itemPrice;
                    }

                    // Atualiza o total e o conteúdo da sacola
                    updateTotal();
                    updateCart();
                }
            });
        });
    }

    // Adiciona o evento de clique aos botões "ADICIONAR"
    document.querySelectorAll('.add').forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const name = card.querySelector('.descricao').textContent.trim();
            const priceText = card.querySelector('.valor').textContent.trim().replace('R$ ', '');
            const price = parseFloat(priceText);

            addItem(name, price);
        });
    });
});
