import {httpGet}     from './getData';
import {CreateBooks} from './booksFactory';

httpGet("./src/data/books.json")
	.then(
	response => {
		all_books = JSON.parse(response).books;
	},
	error => console.log(`Rejected: ${error}`)
	);

//JSON
let all_books           = "JSON from promise";

function Search (json) {
	this.all_books         = json;
	this.searching_books   = undefined;
	this.SEARCH_BTN        = document.querySelector('.search input[type="button"]');
	this.SEARCH_INPUT      = document.querySelector('.search input[type="text"]');
	this.BOOKS_AREA        = document.querySelector('.books');
}


Search.prototype.clearAllBooks = function() {
	// все книги
	this.books_in_document = document.querySelectorAll('.book');

	if (this.books_in_document.length != 0 ) {
		for (let i = 0; i < this.books_in_document.length; i++) {
			this.BOOKS_AREA.removeChild(this.books_in_document[i]);
		}
	}
};

Search.prototype.CreateBooks = function(new_json){
	if (new_json.length == 0) {
		alert('404');
		CreateBooks(all_books);
	}
	CreateBooks(new_json);
};

Search.prototype.modifyJSON = function() {
	let value = this.SEARCH_INPUT.value;

	this.searching_books = this.all_books.filter(function(item) {
		// если валью из ипута является частью значение уровня, автора, названия - добавит в новый массив, нет - нет.
  		return item.level.toLowerCase().indexOf(value.toLowerCase())  + 1 ||
  			   item.author.toLowerCase().indexOf(value.toLowerCase()) + 1 ||
  			   item.title.toLowerCase().indexOf(value.toLowerCase())  + 1 ;
	});

};

Search.prototype.search = function() {
	this.clearAllBooks();
	this.modifyJSON();
	this.CreateBooks(this.searching_books);	
};

Search.prototype.add_event_listeners = function() {
	let self = this;
	this.SEARCH_BTN.onclick=function(){
		self.search();
	};
	this.SEARCH_INPUT.onkeydown=function(e){
		if (e.keyCode == 13) {
			self.search();
		}
	};
};

// Таймаут для того чтобы успеть стащить JSON
setTimeout(function(){
	let search = new Search(all_books);
	search.add_event_listeners();
}, 1000);


// Логика вкратце: Есть изначальный JSON, фильтруем его через значение инпута, обнуляем все книги, ренедерим новый JSON.	