angular.module('examples.angularjs')
    .controller('examples.angularjs.TabsCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.tabs = [{
            title: '前端组',
            template: '<span style="color:red;">{{tab1Content}}</span>'
        }, {
            title: '视觉组',
            template: '<span style="color:green;">{{tab2Content}}</span>'
        }, {
            title: '运营组',
            template: require('./tabs-3.html')
        }, {
            title: '市场组',
            template: require('./tabs-4.html')
        }];
        $scope.tabSwitch = function (index) {
            console.log('tab切换到：' + index);
        };
        $scope.active = 1;
        $scope.tab1Content = "都是小哥哥";
        $scope.tab2Content = "都是阿姨";
        $scope.tab3Content = "都是小姐姐";
        $scope.tab4Content = "都是大叔";
        $scope.openDialog = function (size) {
            alert('点击了我');
        };
        $timeout(function () {
            $scope.active = 2;
        }, 2000);
    }]);