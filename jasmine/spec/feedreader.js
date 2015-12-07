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
        /* Steps 5 & 6: Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         * What happens when you change
         * allFeeds in app.js to be an empty array and refresh the page?
         *
         * Commented out items so allFeeds is an empty array. Results in
         *      Expected 0 not to be 0.
         *      at Object.<anonymous> (file:///Users/boss/Documents/Udacity/frontend-nanodegree-feedreader/jasmine/spec/feedreader.js:26:41)
         length is 0.
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        }); //Close are defined


        /* Step 7: Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        describe('URL Defined',function(){
            allFeeds.forEach(function(allFeeds){
                it('has a url', function(){
                    expect(allFeeds.url).toBeDefined();
                    expect(allFeeds.url.length).not.toBe(0);
                }); //Close its has url
            }); //Close allFeeds.forEach
        }); //Close URL defined

        /* Step 8: Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        describe('name Defined',function(){
            allFeeds.forEach(function(allFeeds){
                it('has a name', function(){
                    expect(allFeeds.name).toBeDefined();
                    expect(allFeeds.name.length).not.toBe(0);
                }); //Close it has a name
            }); //Close allFeeds.forEach
        }); //Close name defined

    }); //Close RSS Feeds


    /* Step 9: A new test suite named "The menu" */

    describe('The menu',function(){

        /* Step 10: Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         *
         * default state of body is class menu-hidden
         */

        describe('is hidden by default',function(){
            it('has a class',function(){
                expect(document.body.className).toBeDefined();
                expect(document.body.className).toMatch("menu-hidden");

            }); // Close it has a class
        }); //Close is hidden by default

         /* Step 11: Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        describe('changes visibility',function(){
            it('when the menu is clicked', function(){

                $('a.menu-icon-link').on('click',function(){
                    console.log('debug:',document.body.className);
                });

                // first click
                $('a.menu-icon-link').trigger('click');
                expect(document.body.className).not.toBe('menu-hidden');

                //second click
                $('a.menu-icon-link').trigger('click');
                expect(document.body.className).toBe('menu-hidden');

            });

        }); //changes visibility
    }); //Close the menu

    /*  Test suite named "Initial Entries" */

    describe('Initial Entries',function(){

        /* Step 12 : Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function (done) {
            loadFeed(0,done);
        });

        it('has at least 1 entry in feed container', function(done){
            expect($('.feed').length).not.toBe(0);
            expect($('.entry').length).not.toBe(0);
            done();
        });

    }); //Close Initial Entries

    /* Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection',function(){
        /* Step 13: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        beforeEach(function (done) {
            $('feed').empty();

            loadFeed(0, function(){
                oldContent = $('.feed').find('h2').text();
                //console.log("debug old:", oldContent);
            });

            loadFeed(1,function(){
                newContent = $('.feed').find('h2').text();;
                //console.log("debug new:",newContent);
                done();
            });
        }); // Close beforeEach

        it('has loaded and content has changed', function(done){
            expect(oldContent).not.toEqual(newContent);
            done();
        });


    });  //Close New Feed Selection

}());
