const newLinkURL = document.querySelector('#new-link-url');
const newLinkSubmit = document.querySelector('.new-link-form--submit');
const newLinkForm = document.querySelector('.new-link-form');
const linkTemplate = document.querySelector('#link-template');
const linksSection = document.querySelector('.links');

newLinkURL.addEventListener('keyup', () => {
	newLinkSubmit.disabled = !newLinkURL.validity.valid; //Checks validity of URL and toggles disabled attribute
})

const parser = new DOMParser();
const parseResponse = (text) => parser.parseFromString(text, 'text/html')
const findTitle = (nodes) => nodes.querySelector('title').textContent;

const addToPage = ({ title, url }) => {
	const newLink = linkTemplate.content.cloneNode(true);
	const titleElement = newLink.querySelector('.link--title');
	const urlElement = newLink.querySelector('.link--url');

	titleElement.textContent = title;
	urlElement.href = url;
	urlElement.textContent = url;

	linksSection.appendChild(newLink);
	return { title, url }
};

newLinkForm.addEventListener('submit', () => {
	event.preventDefault();
	const url = newLinkURL.value;
	fetch(url) //Similar to a doing an Ajax request
		.then(response => response.text()) //Promise(read up on how these work)
		.then(parseResponse)
		.then(findTitle)
		.then(title => ({title, url}))
		.then(addToPage)
		.then(title => console.log(title))
		.catch(error => console.log(error));
})