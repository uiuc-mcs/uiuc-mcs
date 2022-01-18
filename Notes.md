## angular-gh-pages engine.js
  angular-gh-pages
function createNotFoundPage(dir, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        function copy_pages(pages, f_dir) {
            for (let i = 0; i < pages.length; i++) {
                var page = pages[i];
                var page_html_path = path.join(f_dir, `${page}.html`);
                try {
                    if (i >= pages.length) {
                        return fse.copy(indexHtml, page_html_path);
                    }
                    fse.copy(indexHtml, page_html_path);
                }
                catch (err) {
                    logger.info(`index.html could not be copied to ${page}.html. This does not look like an angular-cli project?!`);
                    logger.info('(Hint: are you sure that you have setup the directory correctly?)');
                    logger.debug('Diagnostic info: ' + err.message);
                    return;
                }
            }
        }
        if (options.dryRun) {
            logger.info('Dry-run / SKIPPED: copying of index.html to 404.html');
            return;
        }
        const indexHtml = path.join(dir, 'index.html');
        const pages_to_copy = ['404', 'reviews', 'courses', 'privacy',
            'terms', 'login', 'register', 'createReview',
        ];
        const courses = [
            'CS-598-Advanced-Bayesian-Modeling',
            'CS-525-Advanced-Distributed-Systems',
            'CS-441-Applied-Machine-Learning',
            'CS-498-Cloud-Computing-Applications',
            'CS-598-Cloud-Computing-Capstone',
            'CS-435-Cloud-Networking',
            'CS-445-Computational-Photography',
            'CS-598-Data-Mining-Capstone',
            'CS-416-Data-Visualization',
            'CS-411-Database-Systems',
            'CS-598-Deep-Learning-for-Healthcare',
            'CS-425-Distributed-Systems-(Cloud-Computing-Concepts)',
            'CS-598-Foundations-of-Data-Curation',
            'CS-418-Interactive-Computer-Graphics',
            'CS-437-Internet-of-Things',
            'CS-412-Introduction-to-Data-Mining',
            'STAT-420-Methods-of-Applied-Statistics',
            'CS-447-Natural-Language-Processing',
            'CS-450-Numerical-Analysis',
            'CS-484-Parallel-Programming',
            'CS-598-Practical-Statistical-Learning',
            'CS-421-Programming-Languages-and-Compilers',
            'CS-519-Scientific-Visualization',
            'CS-427-Software-Engineering-I',
            'CS-410-Text-Information-Systems',
            'CS-513-Theory-and-Practice-of-Data-Cleaning',
        ]
        const directory = path.join(dir, 'courses')
        logger.info(`directory = ${directory}`)
        if (!fse.existsSync(directory)) {
            fse.mkdirSync(directory)
        }
        copy_pages(pages_to_copy, dir)
        copy_pages(courses, directory)
        
        // for (let i = 0; i < pages_to_copy.length; i++) {
        //     var page = pages_to_copy[i];
        //     var page_html_path = path.join(dir, `${page}.html`);
        //     try {
        //         if (i >= pages_to_copy.length) {
        //             return yield fse.copy(indexHtml, page_html_path);
        //         }
        //         fse.copy(indexHtml, page_html_path);
        //     }
        //     catch (err) {
        //         logger.info(`index.html could not be copied to ${page}.html. This does not look like an angular-cli project?!`);
        //         logger.info('(Hint: are you sure that you have setup the directory correctly?)');
        //         logger.debug('Diagnostic info: ' + err.message);
        //         return;
        //     }
        // }
        // if (options.dryRun) {
        //     logger.info('Dry-run / SKIPPED: copying of index.html to 404.html');
        //     return;
        // }
        // const indexHtml = path.join(dir, 'index.html');
        // const notFoundPage = path.join(dir, '404.html');
        // try {
        //     return yield fse.copy(indexHtml, notFoundPage);
        // }
        // catch (err) {
        //     logger.info('index.html could not be copied to 404.html. This does not look like an angular-cli project?!');
        //     logger.info('(Hint: are you sure that you have setup the directory correctly?)');
        //     logger.debug('Diagnostic info: ' + err.message);
        //     return;
        // }
    });
}

## TODO

### Problematic URLs

* https://uiucmcs.org/courses/CS-425-Distributed-Systems-\(Cloud-Computing-Concepts\)
* https://uiucmcs.org/courses/CS-425-Distributed-Systems-(Cloud-Computing-Concepts)

### Misc

* Cursor pointer for grid tags
* Sort course list by semester
* Cleanup: ag "computerScience"
* Can't vote your own helpful
* Tabs on profile page with reviews  or profile
* Add review bottom right button


* Common class pairings feature?



## Old
Load data in chunks for reviews - https://medium.com/@AnkitMaheshwariIn/pagination-in-angular-firestore-firebase-database-add-get-documents-14ca723e9c24

### Deploying
git remote add origin git@github.com:uiuc-mcs/uiuc-mcs.git
ng deploy --base-href=https://uiucmcs.org --cname=uiucmcs.org --no-silent