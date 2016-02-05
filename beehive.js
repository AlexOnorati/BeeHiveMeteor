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
            return Entries.findOne({_id: this.params._id});
        }
    });
    this.layout('layout');
},
{
    name: 'entries.show'
}
            
);

if (Meteor.isClient) {
    var hasSubmitted = true;
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
            
           
            
            if(name.length > 0 && count.length > 0 && duration.length > 0 && date.length > 0){
                Entries.insert(
                {
                    name: name,
                    count: count,
                    duration: duration,
                    date: date,
                    createdon: Date.now()
                });
                
                hasSubmitted = true;
                nameBox.css('border-color', 'gray');
                countBox.css('border-color', 'gray');
                durationBox.css('border-color', 'gray');
                dateBox.css('border-color', 'gray');
           
            }else{
                if(name.length == 0){
                    nameBox.css('border-color', 'red');
                }
                
                if(count.length == 0){
                    countBox.css('border-color', 'red');
                }
                
                if(duration.length == 0){
                    durationBox.css('border-color', 'red');
                }
                
                if(date.length == 0){
                    dateBox.css('border-color', 'red');
                }
            }
        
        },
        "hasSubmitted" : function (){
            return hasSubmitted;
        }
}
  );
    
    Template.entriesTable.helpers({
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
