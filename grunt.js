module.exports = function (grunt) {
    grunt.initConfig({
        lint: {
            files: ['scripts/cell.js', 'scripts/game.js', 'scripts/resourceManager.js', 
                    'scripts/util.js', 'scripts/button.js', 'script/counter.js',
                    'scripts/events.js']
        }
    }); 
}