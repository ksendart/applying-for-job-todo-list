
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

app.service('demoService',function(){
	this.checkField = function(str){
		var result = false;
		var chars = "*,[,],{,},/,*,.js,.sql";
		theList = chars.split(",");
		
		for (x=0;x<theList.length;x++) {
			if (str.indexOf(theList[x]) >= 0) {
			    return false
			}else{
				result = true;
			}
		}
		return result;
	}
	this.getRef = function(){
		return firebase.database().ref();
	}
	this.getTODObyKey = function(ref,param){
		return ref.child('records').orderByChild('key').equalTo(param);
	}
	this.getSteps = function(ref,step){
		return ref.child('todolist').orderByChild('step').equalTo(step);
	}
});

app.controller('showTODOLists', function($scope , $timeout, $routeParams,  $firebaseArray, demoService) {
		
		var param = $routeParams.uniquekey;
		$scope.todolistkey= param;
		var ref = demoService.getRef();

		PrintTODO(param); 

		function PrintTODO(param){
			if (param){
				demoService.getTODObyKey(ref,param).once('value', function(snapshot){
						$timeout(function() {
							$scope.groups = snapshot.val();
							return snapshot.val();
						}); 
					 });
			}
			else {
				$scope.groups = $firebaseArray(ref.child('records'));
			}
		}


		$scope.removeItem = function(step){
			demoService.getTODObyKey(ref,param).once('value', function(snapshot){
				$timeout(function() {
					snapshot.forEach(function(snap){
						var dataRef = snap.ref;
						demoService.getSteps(dataRef,step).once('value', function(snapshotRem){
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
			if (demoService.checkField(act) && demoService.checkField(step)){
				demoService.getTODObyKey(ref,param).once('child_added', function(snapshot){
					$timeout(function() {
						var newObj = {'step':step,'act':act};
						var dataRef = snapshot.ref;
						var isConfirm = false;
						demoService.getSteps(dataRef,step).once('value', function(snapshotRem){
							$timeout(function() {
								if (snapshotRem.val() != null){
									isConfirm = confirm('Step already exist! Do you want to overwrite it?');
									if(isConfirm){
										snapshotRem.forEach(function(sn){
											sn.ref.remove();
										});
										dataRef.child('todolist').push(newObj);
										$scope.newStep = "";
										$scope.newDo = "";
									}
								}else{
									dataRef.child('todolist').push(newObj);
									$scope.newStep = "";
									$scope.newDo = "";
								}
								PrintTODO(param);
							});
						});
					});
				});
			}else alert('Incorrect character! Step and act may consist of letters and numbers');
		};


		$scope.removeTODO = function(key) {
			demoService.getTODObyKey(ref,key).once('value', function(snapshot){
				$timeout(function() {
					if (snapshot.val()!= null) {
						snapshot.forEach(function(sn){
									sn.ref.remove();
						});
					}else alert('Cannot remove - object does not exist!');
					PrintTODO(param);
				});			            
			});
		}; 

		$scope.addTODOList = function(key){
			if (demoService.checkField(key)){
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
			}else alert('Incorrect character! Key may consist of letters, "-" and numbers');
		};
});