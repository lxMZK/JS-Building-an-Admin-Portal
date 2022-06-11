async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)

    let save = document.querySelectorAll('.save')
    let del = document.querySelectorAll('.del')
    let vals = document.querySelectorAll('input')

    for(let i = 0; i < save.length; i++){
        save[i].addEventListener('click', function(){
            fetch('http://localhost:3001/updateBook', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': parseInt(save[i].id.slice(-1)),
                    'quantity': vals[i].value
                })
            })
            
        })

        del[i].addEventListener('click', function(){
            let select = document.querySelectorAll(`#b${parseInt(del[i].id.slice(-1))}`)
            for (let i = 0; i < select.length; i++){
                select[i].remove()
            }

            fetch(`http://localhost:3001/removeBook/${parseInt(del[i].id.slice(-1))}`, {
                method: 'DELETE',
            })
        })
    }

    let form = document.querySelector('#form')
    document.querySelector('#submit').addEventListener('click', function(){
        fetch('http://localhost:3001/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': books.pop().id + 1,
                'title': form.title.value,
                'year': new Date().getFullYear,
                'description': form.desc.value,
                'quantity': 1,
                'imageURL': form.url.value
            })
        })
    })
}

function renderBook(book) {
    let bookContainer = document.querySelector('.container')
    bookContainer.innerHTML += `
        <li id='b${book.id}'>${book.title}</li>
        <input type='number' id='b${book.id}' name='b${book.id}' value='${book.quantity}'}></input>
        <button class='save' id='b${book.id}'>Save</button>
        <button class='del' id='b${book.id}'>Delete</button>`
}


main()