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

test('test addBookmark if not present', async () => {
    try {
        let testBookmark = {};
        testBookmark.source = "USA Today";
        testBookmark.username = "Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti";
        let createdBookmark = await bookmarkMethods.addBookmark(
            "USA Today",
            "Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti",
            "150+ epic deals you can already get at Amazon's Cyber Monday sale: Shop AirPods, Roombas, Beats and more - USA TODAY",
            "https://www.gannett-cdn.com/presto/2021/11/28/USAT/5779ac95-181b-4434-9700-79f16c6a5a1a-20211127_24.png?crop=1911,1075,x0,y0&width=1911&height=1075&format=pjpg&auto=webp",
            "We've rounded up the best deals from the Amazon Cyber Monday 2021 sale, including savings on Apple, Samsung, KitchenAid and Nintendo.",
            "https://www.usatoday.com/story/money/reviewed/2021/11/27/amazon-black-friday-deals-huge-savings-funko-lg-apple-and-more/8693000002/"
        );
        let expectedBookmark = {};
        expectedBookmark = createdBookmark.getSource();
        expect(expectedBookmark).toStrictEqual(testBookmark);
    }
    catch (err){
        console.log(err);
    }
});

test('test addBookmark if already present', async () => {
    try {
        let createdBookmard = await bookmarkMethods.addBookmark(
            "USA Today",
            "Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti",
            "150+ epic deals you can already get at Amazon's Cyber Monday sale: Shop AirPods, Roombas, Beats and more - USA TODAY",
            "https://www.gannett-cdn.com/presto/2021/11/28/USAT/5779ac95-181b-4434-9700-79f16c6a5a1a-20211127_24.png?crop=1911,1075,x0,y0&width=1911&height=1075&format=pjpg&auto=webp",
            "We've rounded up the best deals from the Amazon Cyber Monday 2021 sale, including savings on Apple, Samsung, KitchenAid and Nintendo.",
            "https://www.usatoday.com/story/money/reviewed/2021/11/27/amazon-black-friday-deals-huge-savings-funko-lg-apple-and-more/8693000002/"
        );
        expect(createdBookmark).toStrictEqual("Bookmark already present")
    }
    catch (err){
        console.log(err)
    }
});

test('test getBookMarks', async () => {
    try {
        let testBookmark = {};
        testBookmark.source = "USA Today";
        testBookmark.username = "Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti";
        let createdBookmark = await bookmarkMethods.getBookMarks("Elsie Boskamp, Megan McCarthy, James Aitchison, Isabelle Kagan, Kasey Caminiti");
        let expectedBookmark = {};
        expectedBookmark.source = createdBookmark.getSource();
        expect(expectedBookmark).toStrictEqual(testBookmark);
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