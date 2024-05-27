const { JSDOM } = require('jsdom');
const { initializeCommentEnvironment, addComment } = require('./comments.js');

let document;
let window;
let container;
let inputElement;
let postButton;
let commentSection;

beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><html><body>
        <div class="container">
            <input id="input-comment" />
            <button id="post-btn">Post</button>
            <div id="comment-section"></div>
        </div></body></html>`);
    window = dom.window;
    document = window.document;

    container = document.querySelector('.container');
    inputElement = document.getElementById("input-comment");
    postButton = document.getElementById("post-btn");
    commentSection = document.getElementById("comment-section");

    global.document = document;
    global.window = window;
});

afterEach(() => {
    document.body.innerHTML = '';
});

describe('Comment functionality', () => {
    test('should add a comment', () => {
        addComment("This is a test comment", commentSection);

        const comments = commentSection.querySelectorAll('.comment');
        expect(comments.length).toBe(1);
        expect(comments[0].textContent).toBe("This is a test comment");
    });

    test('should not add an empty comment', () => {
        addComment("", commentSection);

        const comments = commentSection.querySelectorAll('.comment');
        expect(comments.length).toBe(0);
    });

    test('should handle comment posting through the button', () => {
        initializeCommentEnvironment();

        inputElement.value = "Another test comment";
        postButton.click();

        const comments = commentSection.querySelectorAll('.comment');
        expect(comments.length).toBe(1);
        expect(comments[0].textContent).toBe("Another test comment");
    });
});
