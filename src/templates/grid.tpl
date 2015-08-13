<div>
<%
collection.each(function(model) {
%>
    <%= model.view.el %>
<%
});
%>
</div>
