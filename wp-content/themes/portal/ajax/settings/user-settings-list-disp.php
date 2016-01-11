<?php

global $root;
global $wpdb;
?>
<div class="box-header" data-original-title>
                <h2><i class="halflings-icon wrench"></i><span class="break"></span>User Settings List</h2>
             
            </div>
<div class="box-content" >
                <div class="row-fluid">
                    <div class="row-fluid">
              
               <input type="text" id="searchItem" class="input-xlarge focused">
               <a  class="searchUserSettings cursorPt"><i class="halflings-icon search" data-rel="tooltip"  data-original-title="Search"  ></i></a>&nbsp;&nbsp;&nbsp;&nbsp;
          
                <!--<a  class="addClass cursorPt" data-rel="tooltip"  data-original-title="Add Attribute"  >Add</a> &nbsp;&nbsp;-->
              
              
            </div>
                <table class="table table-striped table-bordered bootstrap-datatable datatables" >
            <thead><tr>
               
                <th class="sortOrder" data-type="attribute">Attribute <span class="sorting-indicator">^</span></th>
                 <th class="sortOrder" data-type="form_element">Form Element<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="options">Options (Drop Down)<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="searchable">Visible<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="is_visible_user">Visible On Users<span class="sorting-indicator">^</span></th>
                 <th class="sortOrder" data-type="is_visible_reg">Visible On Register<span class="sorting-indicator">^</span></th>
                  
                <th class="sortOrder" data-type="is_required">Required<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="placeholder">Place Holder<span class="sorting-indicator">^</span></th>
                 <th class="sortOrder" data-type="title_placeholder">Tooltip<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="class_name">Class Name<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="style_name">Style Name<span class="sorting-indicator">^</span></th>
                <th class="sortOrder" data-type="order_by">Order By<span class="sorting-indicator">^</span></th>
                 <th>Actions</th>
                </tr></thead> 
                    <tbody id="userSettingsBody"></tbody>
                </table> <div class="row-fluid paginationDiv" ></div>
            </div>