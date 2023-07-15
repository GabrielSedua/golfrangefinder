(function(){
 noteApp.factory('postService',function($localStorage){
      var posts = new Array();
        return{
            getPosts: function(){
            //Get posts from Local Storage  
            posts = $localStorage.post;                 
            return posts ? posts : [];  
            },
            savePosts: function(updatedPost){
            //save posts to Local Storage
            $localStorage.post = updatedPost;
            }
        }
    });
    
})();