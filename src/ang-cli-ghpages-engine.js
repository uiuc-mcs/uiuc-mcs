function createNotFoundPage(dir, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.dryRun) {
            logger.info('Dry-run / SKIPPED: copying of index.html to 404.html');
            return;
        }
        const indexHtml = path.join(dir, 'index.html');
        const pages_to_copy = ['404', 'reviews'];
        for (let i = 0; i < pages_to_copy.length; i++) {
            var page = pages_to_copy[i];
            var page_html_path = path.join(dir, `${page}.html`);
            try {
                if (i >= pages_to_copy.length) {
                    return yield fse.copy(indexHtml, page_html_path);
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