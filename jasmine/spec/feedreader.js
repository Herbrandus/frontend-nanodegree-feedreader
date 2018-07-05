/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensures the feed object has a URL defined
         * and that the URL is not empty.
         */
         allFeeds.forEach(function(feedUrl) {
             it('item has working URL', function() {
                expect(feedUrl.url).toBeDefined();
                expect(feedUrl.url.length).toBeGreaterThan(0);
             });
         });


        /* Ensure the feed object has a name defined
         * and that the name is not empty.
         */
         allFeeds.forEach(function(feedName) {
             it('item has a name', function() {
                expect(feedName.name).toBeDefined();
                expect(feedName.name.length).toBeGreaterThan(0);
             });
         });
    });


    describe('The menu', function() {
        /* Ensure the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function(){
            expect(document.querySelector('body').className).toContain('menu-hidden');
        });

         /* Ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('changes visibility when clicked', function() {

            // simulate click event
            document.querySelector('.menu-icon-link').click();

            expect(document.querySelector('body').hasClass('menu-hidden')).not.toBe(true);

            // simulate click event
            document.querySelector('.menu-icon-link').click();

            expect(document.querySelector('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    
    describe('Initial Entries', function() {

        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */        

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are called and exist in DOM', function(done) {
            expect(document.querySelector('.feed .entry')).not.toBe(null);
            done();
        });
    });

    
    describe('New Feed Selection', function() {

        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var firstElement = null;
        var secondElement = null;

        beforeEach(function(done) {

            loadFeed(0, function() {
                // save the first link in a variable
                firstElement = document.querySelector('.entry-link').getAttribute('href');
            
                loadFeed(1, function() {
                    // also save the second after getting new data
                    secondElement = document.querySelector('.entry-link').getAttribute('href');
                    done();
                });
            });
            
        });
        
        it('changes after loading another', function(done) {
            // compare the two elements from the functions
            // they should not be equal 
            // If they are, it would mean loadFeed did not load new data
            expect(firstElement == secondElement).toBe(false);
            done();
        });
    });

}());
