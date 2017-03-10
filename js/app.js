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
        addNewLink: function() {
            this.markeds.push({
                link: this.newMark.link,
                name: this.newMark.name
            });

            // if possible, store it
            if (localStorageAvaible)
            {
                localStorage.setItem('mark-'+ (this.markeds.length - 1), [this.newMark.name, this.newMark.link].join());
            }

            // reset new mark
            this.newMark = {
                link: '',
                name: ''
            };
        },
        removeLink: function(index) {
            if (localStorageAvaible)
            {
                localStorage.removeItem('mark-'+index);
            }
            this.markeds.splice(index, 1);
        },
        fetchLinks: function() {
            if (localStorageAvaible)
            {
                for(var i = 0; i < localStorage.length; i++)
                {
                    if (localStorage.key(i).split('-')[0] === 'mark')
                    {
                        var item = localStorage.getItem(localStorage.key(i)).split(',');
                        this.markeds.push({
                            name: item[0],
                            link: item[1]
                        });
                    }
                }
            }
        }
    }
});

app.fetchLinks();
