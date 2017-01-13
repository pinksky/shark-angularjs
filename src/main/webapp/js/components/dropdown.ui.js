require('@ntesmail/shark-ui/src/main/webapp/js/components/selecter.ui');
var COMPONENTS = require('../common/const');
angular.module('shark-angular.ui')
    .directive(COMPONENTS.dropdown, ['sharkconfig', function (sharkconfig) {
        var DropdownConfig = sharkconfig.getConfig()[COMPONENTS.dropdown];
        return {
            restrict: 'E',
            link: function ($scope, element, attrs) {
                var dropdown;
                var disableWatcher;
                // 销毁
                function destroy() {
                    element.empty();
                    if (disableWatcher) {
                        disableWatcher();
                    }
                    if (dropdown) {
                        dropdown.destroy();
                        dropdown = null;
                    }
                }

                // 回调函数
                var selectCb = $scope.$eval(attrs.onselect);
                // 按钮的文字
                var text = attrs.text;
                // 对应的真值字段
                var actualKey = (typeof attrs.actualKey !== 'undefined' ? attrs.actualKey : DropdownConfig.actualKey);
                // 对应的展示值字段
                var displayKey = (typeof attrs.displayKey !== 'undefined' ? attrs.displayKey : DropdownConfig.displayKey);
                // 如果定义了name属性，把dropdown组件赋给$scope
                var dropdownName = attrs.name;


                // 下拉框数据变化后，重置下拉框
                $scope.$watch(function () {
                    return $scope.$eval(attrs.dropdownData);
                }, function (newValue, oldValue) {
                    if (!newValue) {
                        return;
                    }
                    destroy();
                    dropdown = $.fn.sharkDropdown({
                        data: newValue,
                        text: text,
                        actualKey: actualKey,
                        displayKey: displayKey,
                        onSelected: function (v) {
                            if (typeof selectCb === 'function') {
                                selectCb.apply(dropdown, arguments);
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                        }
                    });
                    element.append(dropdown);

                    if (typeof attrs.ngDisabled !== 'undefined') {
                        // 监听组件是否被禁用
                        disableWatcher = $scope.$watch(function () {
                            return $scope.$eval(attrs.ngDisabled);
                        }, function (newValue, oldValue) {
                            if (dropdown) {
                                if (newValue === true) {
                                    dropdown.disable();
                                }
                                if (newValue === false) {
                                    dropdown.enable();
                                }
                            }
                        });
                    }
                    if (dropdownName) {
                        $scope[dropdownName] = dropdown;
                    }
                }, true);

                // $scope销毁时同步销毁dropdown组件
                $scope.$on('$destroy', function () {
                    destroy();
                });
            }
        };
    }]);
