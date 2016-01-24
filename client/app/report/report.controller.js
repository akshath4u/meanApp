'use strict';

angular.module('meanAppApp')
  .controller('ReportCtrl', function ($scope,$http) {
  	$http.get('/api/bills').success(function(report){
  		$scope.user=report;
  		$scope.gridOptions = {
                rowAlternationEnabled:true,
                showRowLines:true,
                showColumnLines:true,
                columnAutoWidth :{
                    enabled:true
                },filterRow: { visible: true },
                bindingOptions: {
                    dataSource: 'user'
                },
                 pager: { visible: true },
                paging: {
                    enabled: true,
                    pageSize: 15
                },
                summary: {
                        groupItems: [{
                        column: 'billNo', // the column to be used in calculating the summary item's value
                        summaryType: 'count', // 'sum' | 'min' | 'max' | 'avg' | 'count' | 'custom'
                        valueFormat: "longTime",
                        displayFormat: 'Total Bills {0} '
                        }  ]

                },
                columnChooser: { enabled: true },
                groupPanel: { visible: true, emptyPanelText: 'Drag a column header here to group grid records' },
            
                 headerFilter: {
                 visible: true
                 },
                searchPanel: { visible: true },
                export : {
                    enabled: true,
                    fileName: 'UsrReport'
                },
                    columns: [
                        {
                            dataField: 'customerId.name',
                            caption: 'CustomerName',
                            groupIndex : 0
                        },
                        {
                            dataField: 'customerId.mobile',
                            caption: 'Mobile'
                        },
                         {
                            dataField: 'customerId.email',
                            caption: 'Email'

                        },
                         {
                            dataField: 'billNumber',
                            caption: 'BillNo'

                        },
                         {
                            dataField: 'items.0.name',
                            caption: 'ItemName'

                        },
                         {
                            dataField: 'items.0.Rate',
                            caption: 'Amount'

                        },
                         {
                            dataField: 'items.0.quantity',
                            caption: 'Qty'

                        },
                         {
                            dataField: 'Tax',
                            caption: 'Tax'

                        },
                         {
                            dataField: 'discount',
                            caption: 'Discount'

                        }
                       
                    ] 
                };
  	}).error(function(){

  	});
     

  });
