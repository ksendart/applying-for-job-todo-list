
var config = {
    apiKey: "AIzaSyBux6rJ4EiQ9Ub4UVx5ZmHupVVjbPKjJhQ",
    authDomain: "demotodolist-ff08f.firebaseapp.com",
    databaseURL: "https://demotodolist-ff08f.firebaseio.com",
    storageBucket: "demotodolist-ff08f.appspot.com",
    messagingSenderId: "1057956428948"
  };
  firebase.initializeApp(config);

var app = angular.module("myApp", ["ngRoute", "firebase"]);
app.run(function() {
})

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.htm"
    })
    .when("/edittodo/:uniquekey", {
        templateUrl : "edittodo.htm",
        controller : "editTODOCtrl"
    })
});
app.controller("newTODOCtrl", function($scope) {
    $scope.steps = [];
    $scope.addStep = function () {
        $scope.steps.push($scope.newStep);
        $scope.newStep = "";
    }
    $scope.removeStep = function (x) {
        $scope.steps.splice(x, 1);
    }
});
app.constant({fireBaseUrl: 'https://demotodolist-ff08f.firebaseio.com/'});
app.controller('editTODOCtrl',function($scope,$routeParams){
    $scope.todolistkey= $routeParams.uniquekey;

});

app.controller('singInGoogle',function($scope, $firebaseAuth ){

	$scope.username =" user.. ";       

        var auth = $firebaseAuth(); 
        auth.$signInWithPopup('google').then(function(result) {
        					$scope.username = result.user.displayName;
							$scope.user = result.user;
							console.log($scope.user);
		}).catch(function(error) {
			console.log(error);
		});

});

app.controller('showTODOLists', function($scope , $timeout, $routeParams,  fireBaseUrl, $firebaseObject, $firebaseAuth ) {
        

        
        var param = $routeParams.uniquekey;
        var ref = firebase.database().ref();//new Firebase(fireBaseUrl);

		PrintTODO(param); 

        function PrintTODO(param){
	        if (param){
	        		ref.child('records').orderByChild('key').equalTo(param).once('value', function(snapshot){
						$timeout(function() {
							$scope.groups = snapshot.val();
							return snapshot.val();
						});			            
				     });        	
	        }
	        else {
	        	datas = $firebaseObject(ref.child('records'));
	        	$scope.groups = datas;
	        }
	    }


        $scope.removeItem = function(step){
			ref.child('records').orderByChild('key').equalTo(param).once('value', function(snapshot){
				$timeout(function() {
					snapshot.forEach(function(snap){
						var dataRef = snap.ref;
						dataRef.child('todolist').orderByChild('step').equalTo(step).once('value', function(snapshotRem){
							$timeout(function() {
								snapshotRem.forEach(function(sn){
									sn.ref.remove();
								});
								PrintTODO(param);
							});
						});
					});
					
				});			            
		    });

		};        

		
		$scope.addItem = function(step, act){
			ref.child('records').orderByChild('key').equalTo(param).once('child_added', function(snapshot){
				$timeout(function() {
					var newObj = {"step":step,"act":act};
					var dataRef = snapshot.ref;
					dataRef.child('todolist').push(newObj);
					$scope.newStep = "";
					$scope.newDo = "";
					PrintTODO(param);
				});			            
		     });
		};


        $scope.removeTODO = function(key) {
            ref.child('records').orderByChild('key').equalTo(key).once('value', function(snapshot){
				$timeout(function() {
					if (snapshot.val()!= null) {
						snapshot.forEach(function(sn){
									sn.ref().remove();
						});
					}else alert("Cannot remove - object doesn't exist!");
					PrintTODO(param);
				});			            
		    });
        }; 

        $scope.addTODOList = function(key){
			var item = {"key":key,"todolist":[]};
			$scope.groups.$add(item).then(function(p){
        		console.log(key);
        		$scope.newKey = "";
        		PrintTODO(param);
        	});	        
        };       

    });