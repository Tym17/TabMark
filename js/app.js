var app = new Vue({
    el: '#app',
    data: {
        newLink: '',
        markeds: [
            {link: '#'}
        ]
    },
    methods: {
        say: function(msg) {
            alert(msg);
        },
        addNewLink: function() {
            this.markeds.push({link: this.newLink});
            this.newLink = '';
        }
    }
});
