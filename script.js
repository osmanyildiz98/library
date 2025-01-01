//~ Modülümüzün Açılması Ve Kapanması

//$ Modülümüzü ve gerekli butonları script dosyamıza ekliyoruz.

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.add-book-button');
const closeModal = document.querySelector('.close-modal-button');
const body = document.body;

//$ openModal butonumuza click eventListener' ı veriyoruz.Burada butona tıklandığında modülümüzü showModal() metodu ile açıyoruz.Modül açıldığında arkaplanı biraz daha karartması adına body elemanımıza class ekliyoruz. 

openModal.addEventListener('click', () => {
    modal.showModal();
    body.classList.add('modalIsActive');
});

//$ closeModal butonumuzada aynı şekilde click eventListener'ı veriyoruz.close() metodunu kullanarak modülümüzü kapatmasını sağlıyoruz.Ardından modül açıldığında arkaplanı karartması için body elemanımıza eklediğimiz class'ı kaldırıyoruz.

closeModal.addEventListener('click', () => {
    modal.close();
    body.classList.remove('modalIsActive');
});

//~ Book Objesi Oluşturup myLibrary'i İsimli Array'e Bu Objeleri Ekliyoruz. 

//$ Form ve formda bulunan elemanları script dosyamıza ekliyoruz. 

const form = document.getElementById('form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookRead = document.getElementById('read-or-not');
const addButton = document.querySelector('.add-button');

//$ Book isimli fonksiyonda aldığımız parametrelerle her çağırıldığında bize obje oluşturmasını sağlıyoruz.

function Book(title, author, pages, read) {
    this.title = bookTitle.value;
    this.author = bookAuthor.value;
    this.pages = bookPages.value;
    this.read = bookRead.value;
};

//$ Buradaki fonksiyonda parametre olarak bir book objesi almasını istiyoruz ve bu objeyi myLibrary'i isimli array'e pushluyoruz.

function addBookToLibrary(book) {
    myLibrary.push(book);
};

//~ Card Oluşturma Fonksiyonu 

function createCard(book) {

    //$ Card için gerekli elemanları oluşturuyor ve classları ekliyoruz.

    const card = document.createElement('div');
    const bookInfo = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const bookStatus = document.createElement('div');
    const readStatusButton = document.createElement('button');
    const readIcon = document.createElement('i');
    const changeButton = document.createElement('button');
    const changeIcon = document.createElement('i');
    const removeButton = document.createElement('button');
    const removeIcon = document.createElement('i');

    card.classList.add('card');
    bookInfo.classList.add('book-info');
    bookStatus.classList.add('book-status');
    readStatusButton.classList.add('read-status-button');
    readIcon.classList.add('fa-solid', 'fa-eye');
    changeButton.classList.add('book-change-button');
    changeIcon.classList.add('fa-solid', 'fa-gear');
    removeButton.classList.add('book-remove-button');
    removeIcon.classList.add('fa-solid', 'fa-trash');

    //$ Burada card elemanımızı bookCase isimli divimize aktarıyoruz.

    bookCase.appendChild(card);
    card.appendChild(bookInfo);
    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    card.appendChild(bookStatus);
    bookStatus.appendChild(changeButton);
    changeButton.appendChild(changeIcon);
    bookStatus.appendChild(readStatusButton);
    readStatusButton.appendChild(readIcon);
    bookStatus.appendChild(removeButton);
    removeButton.appendChild(removeIcon);

    //$ İlgili bilgileri alıp card üzerinde gösteriyoruz.

    title.textContent = 'Title: ' + book.title;
    author.textContent = 'Author: ' + book.author;
    pages.textContent = 'Number Of Pages: ' + book.pages;

    if (book.read == 'yes') {

        readStatusButton.classList.add('green');
    }
    else if (book.read == 'no') {

        readStatusButton.classList.add('red');
    }
    else {
        readStatusButton.classList.add('grey');
    }

    //! Change Butonunu Ayarlama

    changeButton.addEventListener('click', () => {

        //^ Modülü çağırıyoruz.

        modal.showModal();
        body.classList.add('modalIsActive');

        //^ addButton isimli butonumuzu kaldırıyoruz ve changeConfirmButton isimli yeni bir buton oluşturuyoruz.

        form.removeChild(addButton);

        const previousChangeConfirmButton = form.querySelector('.change-confirm-button');

        if (previousChangeConfirmButton) {

            form.removeChild(previousChangeConfirmButton);
        };

        const changeConfirmButton = document.createElement('button');
        changeConfirmButton.classList.add('change-confirm-button');
        form.appendChild(changeConfirmButton);
        changeConfirmButton.textContent = 'Change';

        //^ Çağırılan modülde düzenlemek istediğimiz book objemizin bilgilerinin var olmasını sağlıyoruz.

        bookTitle.value = book.title;
        bookAuthor.value = book.author;
        bookPages.value = book.pages;
        bookRead.value = book.read;

        //^ Oluşturduğumuz changeConfirmButton isimli butona click event'i ekliyoruz.

        changeConfirmButton.addEventListener('click', () => {

            //^ Bilgilerini güncelleyeceğimiz book objesini findIndex metodu ile indexini alıyoruz.

            const changedBookIndex = myLibrary.findIndex(b => b.title === book.title && b.author === book.author && b.pages === book.pages && b.read === book.read);

            //^ myLibrary'i arrayimizde güncellenmesini istediğimiz elemanı seçerek güncellenen bilgileri atıyoruz.

            myLibrary[changedBookIndex].title = bookTitle.value;
            myLibrary[changedBookIndex].author = bookAuthor.value;
            myLibrary[changedBookIndex].pages = bookPages.value;
            myLibrary[changedBookIndex].read = bookRead.value;

            //^ Local storage' ı güncelliyoruz.

            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

            addBookToBookCase(myLibrary);

            //^ Modülümüzden kaldırdığımız addButton isimli butonumuzu tekrardan ekliyoruz.Bu sefer changeConfirmButton isimli butonumuzu kaldırıyoruz.

            form.removeChild(changeConfirmButton);
            form.appendChild(addButton);
            addButton.classList.add('add-button');
            modal.close();
            body.classList.remove('modalIsActive');
            getInformation();

        });

    });

    //! Remove Butonunu Ayarlama

    removeButton.addEventListener('click', () => {

        const removedBookIndex = myLibrary.findIndex(b => b.title === book.title && b.author === book.author && b.pages === book.pages && b.read === book.read);

        myLibrary.splice(removedBookIndex, 1);

        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

        addBookToBookCase(myLibrary);

        getInformation();

    });

    //! ReadStatus Butonunu Ayarlama

    readStatusButton.addEventListener('click', () => {

        const changedReadStatusIndex = myLibrary.findIndex(b => b.title === book.title && b.author === book.author && b.pages === book.pages && b.read === book.read);

        let bookStatus = myLibrary[changedReadStatusIndex].read;

        if (bookStatus == 'yes') {

            myLibrary[changedReadStatusIndex].read = 'no';

        } else if (bookStatus == 'no') {

            myLibrary[changedReadStatusIndex].read = '';

        } else {

            myLibrary[changedReadStatusIndex].read = 'yes';

        }

        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

        addBookToBookCase(myLibrary);

        getInformation();

    });

};

//~ myLibrary'i Arrayimizdeki Kitap Nesnelerini bookCase İsimli Divimize Ekleme

const bookCase = document.querySelector('.book-case');

function addBookToBookCase(arrayOfBook) {

    //$ Öncelikle bookCase isimli divi temizliyoruz.

    bookCase.innerHTML = '';

    //$ Fonksiyonda parametre olarak aldığımız arrayi forEach metodu ile döngüye sokuyoruz.Bu sayede myLibrary arrayimizde bulunan her bir öğe için bir card oluşturacağız ve o öğenin bilgilerini oluşturduğumuz bu card üzerinde göstereceğiz.

    arrayOfBook.forEach(book => {

        createCard(book);
    });

};

//~ myLibrary Array'inin Kontrolünü Sağlıyoruz. 

//$ myLibrary isim bir değişken oluşturup localStorage'da bulunan myLibrary isimli arrayi bu değişkene eşitliyoruz.

let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

//$ Local storage da myLibrary isimli bu öğe bulunmuyorsa yukarıda oluşturduğumuz myLibrary isimli değişkeni boş bir array'e eşitliyoruz.Ardından oluşturduğumuz bu boş myLibrary array'ini local storage'a ekliyoruz.

if (!localStorage.hasOwnProperty('myLibrary')) {
    myLibrary = [];
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
} else {

    //$ Else kısmı çalışıyorsa bu local storage da hali hazırda var olan bir myLibrary arrayi olduğunu gösteriyor.Bu durumda bookCase divimizde bu arrayin elemanlarını göstermeliyiz.Bunun için fonksiyonu çağırıyoruz.

    addBookToBookCase(myLibrary);
}

//~ Form'u Submit Ediyoruz.

form.addEventListener('submit', (e) => {

    //$ Formda boş bırakılan inputların olup olmadığının kontrolü sağlanıyor.

    const inputs = form.querySelectorAll('input');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            e.preventDefault();
            input.classList.add('inputs-error');
        }
        else {
            input.classList.remove('inputs-error');
        }
    });

    //$ Burada tekrardan bir kontrol yapılıyor ve bu kontrolü bir değişkene atıyoruz.Bu değişken true veya false (boolen) değer dönecek. 

    const isFormValid = Array.from(inputs).every(input => input.value.trim());

    //$ Bu boolen değer true dönüyorsa yani inputlar için gerekli şart sağlanmışsa new Book kullanarak book objesi oluşturuyoruz.

    if (isFormValid) {

        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.value);

        //$ Oluşturduğumuz bu newBook objesini myLibrary isimli arraye aktarıyoruz.

        addBookToLibrary(newBook);

        //$ myLibrary arrayimizin en güncel halini bookCase divimize aktarıyoruz.

        addBookToBookCase(myLibrary);

        //$ localStorage'da bulunan myLibrary arrayimizide güncelliyoruz.

        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

        //$ Form modülü açıkken body için yaptığımız düzenlemeyi kaldırıyoruz.

        body.classList.remove('modalIsActive');

        //$ preventDefault() metodu ile formun sayfa yenilemesini engellediğimiz için form kapandığında input value'leri var olmaya devam ediyor.Bunu düzeltmek için inputs arrayine forEach metodu uygularayak tüm input değerlerini temizliyoruz.Devamında select elemanımızın value değerini ayrı olarak temizliyoruz.

        inputs.forEach(input => {
            input.value = '';
        });

        form.querySelector('select').value = '';
    };

    getInformation();

});

//~ Local Storage Temizleme Butonu

const storageDeleteButton = document.querySelector('.delete-storage-button');

storageDeleteButton.addEventListener('click', () => {

    localStorage.removeItem('myLibrary');

    myLibrary = [];

    bookCase.innerHTML = '';

    getInformation();

});

//~ Information Kısmını Ayarlama

const numberOfBooks = document.querySelector('.number-of-books');
const finishedBooks = document.querySelector('.finished-books');
const unfinishedBooks = document.querySelector('.unfinished-books');

let finishedBookCount = 0;
let unfinishedBookCount = 0;

numberOfBooks.textContent = myLibrary.length;
finishedBooks.textContent = finishedBookCount;
unfinishedBooks.textContent = unfinishedBookCount;

function getInformation() {

    finishedBookCount = 0;
    unfinishedBookCount = 0;

    myLibrary.forEach(book => {
        if (book.read == 'yes') {

            finishedBookCount++;

        } else if (book.read == 'no') {

            unfinishedBookCount++;
        };
    });

    numberOfBooks.textContent = myLibrary.length;
    finishedBooks.textContent = finishedBookCount;
    unfinishedBooks.textContent = unfinishedBookCount;
};





