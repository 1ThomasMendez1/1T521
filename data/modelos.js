let modulos = {
    usuarios: {
            email: 'fvarela@udesa.edu.ar',
            usuario: 'pipevarela22',
            contraseña: 'udesavarela22', 
            fechaDeNacimiento: '22/05/2003',
            nroDeDocumento: '44852963',
            fotoDePerfil: 'images/users/imageUser.jpg'

        },

    productos: [
        {
            id: 1,
            imagen: 'images/products/airJordan1-1986.jpg',
            nombreDelProducto: 'Air Jordan 1',
            descripcion: 'El primer modelo de la colección y seguramente el más popular. Llevaron el sobrenombre de «Notorious» y convirtieron a Michael Jordan en «Rookie of the Year',
            fechaDeCarga: '22/05/2021'
        },
        {
            id: 2,
            imagen: 'images/airJordanDNA.jpg',
            nombreDelProducto: 'Air Jordan 35 DNA ',
            descripcion: 'Un homenaje a los colores clásicos de las Jordan 5, de ahí el sobrenombre de DNA',
            fechaDeCarga: '24/7/2020'
        },
        {
            id: 3,
            imagen: 'images/airJordanXXXI.jpg',
            nombreDelProducto: 'Air Jordan XXXI',
            descripcion: 'Son un reboot de las Air Jordan 1, una reinterpretación del primer modelo',
            fechaDeCarga: '22/1/2022'
        },
        {
            id: 4,
            imagen: 'images/yeezyBoost.jpg',
            nombreDelProducto: 'Yeezy Boost 350',
            descripcion: 'Es un modelo ultramoderno que conserva los elementos que hacen de esta zapatilla una de las más populares del momento, y viene acompañada con colores contrastados y atractivos, que generalmente suelen ser muy exclusivos',
            fechaDeCarga: '23/3/2022'
        },
        {
            id: 5,
            imagen: 'images/yeezyBoost700.jpg',
            nombreDelProducto: 'Yeezy Boost 700',
            descripcion: 'es un modelo inspirado en los tenis para correr con una suela gruesa. También tienen una combinación de materiales en la parte superior, lengüeta y cuello acolchados, amortiguación Boost y una suela de goma',
            fechaDeCarga: '12/4/2020'
        },
        {
            id: 6,
            imagen: 'images/nikeParadisee.png',
            nombreDelProducto: 'Nike Air Force Paradise',
            descripcion: 'Las Air Force de toda la vida pero diseñadas por Nike y G-Dragon de la banda Big Bang',
            fechaDeCarga: '5/12/2020'
        },
        {
            id: 7,
            imagen: 'images/superfly.jpg',
            nombreDelProducto: 'Jordan Superfly',
            descripcion: 'Estas zapatillas cuentan con la última revolución en amortiguación de baloncesto: espuma Nike React ultrarreactiva diseñada para jugar mejor y durante más tiempo',
            fechaDeCarga: '3/12/2020'
        },
        {
            id: 8,
            imagen: 'images/huarache.webp',
            nombreDelProducto: 'Nike Air Huarache',
            descripcion: 'Confeccionado para obtener ultra comodidad en cada pisada, con entresuela de espuma suave brindando ligereza y capellada de malla combinado con sintético',
            fechaDeCarga: '15/10/2021'
        },
        {
            id: 9,
            imagen: 'images/ozweegoAdiddas.webp',
            nombreDelProducto: 'Adiddas Ozweego',
            descripcion: 'Las zapatillas Ozweego se inspiran en los 90 para crear un estilo innovador. Estas zapatillas reinventan la OZWEEGO 3 de 1988 y la adaptan al presente. El resultado es un diseño ligero y cómodo equipado con la tecnología adiPRENE para ofrecer la máxima comodidad.',
            fechaDeCarga: '17/11/2021'
        },
        {
            id: 10,
            imagen: 'images/midBlazer.webp',
            nombreDelProducto: 'Nike Mid Blazer Vintage 77',
            descripcion: 'Nike Blazer Mid 77 SE toma el estilo clásico de Nike Básquetbol. Sus diseños exquisitos de gamuza, el diseño Swoosh retro y el cuello acolchado lo convierten en un calzado básico moderno',
            fechaDeCarga: '2/7/2021'
        }
    ],

    comentarios: [
        { productos_id: 1, user: 'pipevarela24', contenido: 'Altas zapas amigo', imagen: 'images/imageUser.jpg' },
        { productos_id: 1, user: 'pipevarela23', contenido: 'Siguen disponibles?', imagen: 'images/imageUser.jpg' },
        { productos_id: 3, user: 'pipevarela25', contenido: 'La rompen!!', imagen: 'images/imageUser.jpg' },
    ]



}



// Exporto el modulo 
module.exports = modulos;



