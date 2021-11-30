let bookmarkMethods = require('../models/bookmark');
const createTables = require('../config/sqllite3').createTables;
const deleteTables = require('../config/sqllite3').deleteTables;

beforeAll(async () => {
    await createTables();
    return;
});

afterAll(async () => {
    await deleteTables();
    return;
});

test('test getBookMarks', async () => {
    try {
        let testBookmark = {};
        testBookmark.source = "USA Today";
        testBookmark.username = "Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti";
        let createdBookmarks = await bookmarkMethods.getBookMarks("Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti");
        let expectedBookmarks = {};
        
        /* for loop */
        for (let i = 0; i < createdBookmarks.length; i++){
            expectedBookmarks[i] = createdBookmarks[i].getSource();
        }
        expect(expectedBookmarks).toEqual(expect.arrayContaining(testBookmark));
    }
    catch (err){
        console.log(err);
    }
});

test('test getBookMarks if not present', async () => {
    try {
        let testBookmark = null;
        let expectedBookmark = await bookmarkMethods.getBookMarks("Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti");
        expect(expectedBookmark).toStrictEqual(testBookmark);
    }
    catch (err) {
        console.log(err);
    }
});