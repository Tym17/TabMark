var app = new Vue({
    el: '#app',
    data: {
        newMark: {
            link: '',
            name: ''
        },
        markeds: [
        ]
    },
    methods: {
        say: function(msg) {
            alert(msg);
        },
        sortLinks: function() {
            this.markeds.sort(function (a, b) {
                var nA = a.name.toUpperCase();
                var nB = b.name.toUpperCase();

                if (nA < nB) { return -1; }
                if (nA > nB) { return 1; }
                return 0;
            });
            return this.markeds;
        },
        addNewLink: function() {
            if (this.newMark.link.length == 0 ||
                this.newMark.name.length == 0)
            {
                return;
            }

            this.markeds.push({
                link: this.newMark.link,
                name: this.newMark.name
            });
            var mark = this.markeds[this.markeds.length - 1];

            // if possible, store it
            if (localStorageAvaible)
            {
                localStorage.setItem('mark-'+ mark.name, mark.link);
            }

            // reset new mark
            this.newMark = {
                link: '',
                name: ''
            };
            this.sortLinks();
        },
        removeLink: function(index) {
            if (localStorageAvaible)
            {
                localStorage.removeItem('mark-'+this.markeds[index].name);
            }
            this.markeds.splice(index, 1);
            this.sortLinks();
        },
        fetchLinks: function() {
            if (localStorageAvaible)
            {
                for(var i = 0; i < localStorage.length; i++)
                {
                    if (localStorage.key(i).split('-')[0] === 'mark')
                    {
                        this.markeds.push({
                            name: localStorage.key(i).split('-')[1],
                            link: localStorage.getItem(localStorage.key(i))
                        });
                    }
                }
            }
            this.sortLinks();
        }
    }
});

app.fetchLinks();
