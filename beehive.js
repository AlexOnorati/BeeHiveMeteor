Entries = new Mongo.Collection("entries");

Router.route('/', function(){
    this.render('beeinput'); // Show the beeinput template
    this.layout('layout');
});

Router.route('/admin', function(){
    this.render('admin'); // Show the admin template
    this.layout('layout');
});

Router.route('/entries/:_id', function(){
    this.render('entries', {
        data: function(){
            return Messages.findOne({_id: this.params._id});
        }
    });
    this.layout('layout');
},
{
    name: 'entries.show'
}
            
);

if (Meteor.isClient) {
    
    Meteor.subscribe("entries");
    
    Template.beeinput.events(
        {
          
          
        "submit form": function(event){
            event.preventDefault();
            
            var nameBox = $(event.target).find('input[name=hivename]');
            var name = nameBox.val();
            
            var countBox = $(event.target).find('input[name=mitecount]');
            var count = countBox.val();
            
            var durationBox = $(event.target).find('input[name=duration]');
            var duration = durationBox.val();
            
            var dateBox = $(event.target).find('input[name=collection]');
            var date = dateBox.val();
           
            
                Entries.insert(
                {
                    name: name,
                    count: count,
                    duration: duration,
                    date: date,
                    createdon: Date.now()
                }
            );
        
        }}
  );
    
    Template.beeinput.helpers({
        "entries": function(){
            return Entries.find(
                {}, 
                {
                    sort: 
                    {
                     createdon: -1
                    }
                }) || {};
        }
    });
}

if (Meteor.isServer) {
    
    Meteor.publish("entries", function(){
        return Entries.find();
    })
}
