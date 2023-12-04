<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Результаты</title>
</head>
<body>
<table style="width: 100%">
    <tr>
        <th>Текущее время</th>
        <th>Время выполнения</th>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Результат</th>
    </tr>
    <%
        List<List<String>> results = (List<List<String>>) request.getSession().getAttribute("results");
        if (results != null) {
            for (List<String> pointData : results) {
    %>
    <tr>
        <% for (String data : pointData) { %>
        <td><%= data %></td>
        <% } %>
    </tr>
    <%
            }
        }
    %>
</table>
</body>
</html>