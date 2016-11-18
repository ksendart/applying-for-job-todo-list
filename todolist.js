
var config = {
	apiKey: 'AIzaSyBux6rJ4EiQ9Ub4UVx5ZmHupVVjbPKjJhQ',
	authDomain: 'demotodolist-ff08f.firebaseapp.com',
	databaseURL: 'https://demotodolist-ff08f.firebaseio.com',
	storageBucket: 'demotodolist-ff08f.appspot.com',
	messagingSenderId: '1057956428948'
  };
  firebase.initializeApp(config);

var app = angular.module('myApp', ['ngRoute', 'firebase']);
app.run(function() {
})

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'main.htm',
		controller : 'showTODOLists'
	})
	.when('/edittodo/:uniquekey', {
		templateUrl : 'edittodo.htm',
		controller : 'showTODOLists'
	})
});

app.constant({fireBaseUrl: 'https://demotodolist-ff08f.firebaseio.com/'});

app.controller('showTODOLists', function($scope , $timeout, $routeParams,  fireBaseUrl, $firebaseArray, $firebaseAuth ) {
		var param = $routeParams.uniquekey;
		$scope.todolistkey= $routeParams.param;
		var ref = firebase.database().ref();

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
				$scope.groups = $firebaseArray(ref.child('records'));//datas;
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
					var newObj = {'step':step,'act':act};
					var dataRef = snapshot.ref;
					var isConfirm = false;
					dataRef.child('todolist').orderByChild('step').equalTo(step).once('value', function(snapshotRem){
						$timeout(function() {
							if (snapshotRem.val != null){
								isConfirm = confirm('Step already exist! Do you want to overwrite it?');
								if(isConfirm){
									snapshotRem.forEach(function(sn){
										sn.ref.remove();
									});
									dataRef.child('todolist').push(newObj);
									$scope.newStep = "";
									$scope.newDo = "";
									PrintTODO(param);
								}
							}
						});
					});
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
					}else alert('Cannot remove - object does not exist!');
					PrintTODO(param);
				});			            
			});
		}; 

		$scope.addTODOList = function(key){
			var item = {'key':key,'todolist':[]};
			var flag = true;
			$scope.groups.forEach(function(item){
				if (item.key == key){
					alert('List already exist! Type another name!')
					flag = false;
				}
			});
			if (flag){
				$scope.groups.$add(item).then(function(p){
					console.log(key);
					$scope.newKey = "";
					PrintTODO(param);
				});
			}
		};
});