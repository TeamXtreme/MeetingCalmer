angular.module("controllers",[])

.controller("AppCtrl", ["$scope", "$rootScope","$timeout", function($scope, $rootScope, $timeout){
	console.log("App Ctrl Started");
	
	var ifVibrationOn = function(mode){
		if(mode==1){
			return true;
		}
		else{
			return false;
		}
	}


	var initialize = (function(){
		$scope.data = {};
		//$scope.data.enable_calmer = false;
		//$scope.data.enable_vibration = true;
		$scope.data.refresh_interval = "60";
		$scope.data.nextScheduledScan = /*new Date().toDisplayTime();*/ "Never";

		var data;
		if(window.Android){
			data = JSON.parse(Android.getSharedPref());
			//console.log(data);
			$scope.data.enable_calmer = data.app_state;
			if(ifVibrationOn(data.mode)){
				$scope.data.enable_vibration = true;	
			}
			else{
				$scope.data.enable_vibration = false;
			}
			$scope.data.nextScheduledScan = Android.getNextScheduledScanTime();
		}
	})();	

	/*window.initialize = function(app_active, mode){
		console.log("from native" +app_active + mode);
		$scope.data = {};
		$scope.data.enable_calmer = app_active;
		if(ifVibrationOn(mode)){
			$scope.data.enable_vibration = true;	
		}
		else{
			$scope.data.enable_vibration = false;
		}
		$scope.data.refresh_interval = "60";
		$scope.data.last_refresh_time =  "Never";
	};*/

	$scope.$watchGroup(["data.enable_calmer","data.enable_vibration"], function(newVals, prevVals){
		if(newVals[0] == false){
			if (window.Android) {
				if(newVals[1]==false){
					Android.setDefaults(false,0);
				}
				else{
					Android.setDefaults(false,1);
				}
			};
		}
		else{
			if (window.Android) {
				if(newVals[1]==false){
					Android.setDefaults(true,0);
				}
				else{
					Android.setDefaults(true,1);
				}

				
			};
			
		}
	});

	$scope.$watch("data.enable_calmer", function(newVal){
		if(newVal==false){
			console.log("Meeting Calmer Disabled");
			Android.stopMeetingCalmer();
			$scope.data.nextScheduledScan = null;
		}
		else{
			console.log("Meeting Calmer Enabled");
			Android.startMeetingCalmer();
			$timeout(function(){
				$scope.data.nextScheduledScan = Android.getNextScheduledScanTime();
			},1000);
		}
	});

	$scope.$watch("data.nextScheduledScan", function(newVal){
		$timeout(function(){
			if($scope.enable_calmer == false){
				$scope.data.nextScheduledScan = null;
			}	
		},1000)
		

	})

	$scope.scanNow = function(){
		if(window.Android){
			//Android.showToast("Scanning...");
			Android.startMeetingCalmer();
			$timeout(function(){
				Android.showToast("Scan Complete");
				$scope.data.nextScheduledScan = Android.getNextScheduledScanTime();
			},1000);

		}
	}

	/*$scope.$watch("data.enable_vibration", function(newVal){
		if(window.Android){
			if(newVal == false){
				Android.setDefaults(0);
			}
			else{
				Android.setDefaults(1);
			}
		}
		
	});
*/
	/*$scope.$watch(Android.getNextScheduledScanTime(), function(newVal){
		$scope.last_refresh_time = newVal;
	})
*/
	$scope.submitChanges = function(){
		if(window.Android){
			//Android.testNative("test", true);
			//console.log("Sent from Hybrid");
			//Android.callSubmit();
			
		}
		else{
			console.log("Plugin Not Found");
		}
	}

	window.backToHybrid = function(fromNative){
		console.log("From Native: " + fromNative);
	}

	window.nextScheduleScanTime = function(time){
		$scope.nextScheduledScan = time;
		console.log("time");
	}
}])