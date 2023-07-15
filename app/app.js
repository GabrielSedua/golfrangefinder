var noteApp = angular.module('noteApp', ['ngStorage']);

(function(){
    noteApp.controller('toDoNoteController', function( $scope , postService , $localStorage) {

        //   retrieve posts from localStorage using retrievePostService Factory
         $scope.posts = postService.getPosts();

        /*
         add a new post and store into localstorage
        */
        $scope.addPost = function(){
            var postObject = {
               content  : $scope.content,
               comments : [],
               likes: 0,
               commentIsOpen: false,
            }
            $scope.posts.unshift(postObject);
            postService.savePosts($scope.posts);
            $scope.content  = "";
            return false;
        }

        /*
        toggle comments
        */
        $scope.openComment = function(post){ if($scope.posts[$scope.posts.indexOf(post)].commentIsOpen){      $scope.posts[$scope.posts.indexOf(post)].commentIsOpen = false;
        }
            else{
    $scope.posts[$scope.posts.indexOf(post)].commentIsOpen = true;
            }
        }

        /*
        post a comment on particular post
        */
        $scope.postComment = function(post){ $scope.posts[$scope.posts.indexOf(post)].comments.unshift(post.latestComment);    
          postService.savePosts($scope.posts);  
          post.latestComment = '';
        }

        /*
        increament likes on posts
        */
        $scope.likeUpdate = function(post){
            $scope.posts[$scope.posts.indexOf(post)].likes++ ;
            postService.savePosts($scope.posts);
        } 

        /*
        autoexpand the textarea as text increases
        */
      $scope.autoExpand = function(e) {
            var element = typeof e === 'object' ? e.target : document.getElementById(e);
                var scrollHeight = element.scrollHeight -70; // replace 60 by the sum of padding-top and padding-bottom
            element.style.height =  scrollHeight + "px";    
        };

      function expand() {
        $scope.autoExpand('TextArea');
      }
   });
})();