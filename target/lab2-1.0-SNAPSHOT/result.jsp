<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Лабораторная работа №2</title>
</head>
<%@ include file="/jsp/head.jsp" %>
<header class="top">
    <div class="title_text">
        Кононыхин Кирилл Дмитриевич P3224 Вариант №25046
    </div>
</header>
<body>
    <div class="content background">
        <div id="history__wrapper" class="content__block__result">
            <table id="history" class="table">
                <%@ include file="jsp/table.jsp" %>
            </table>
        </div>
    </div>
    <div class="input-group row-flex">
        <input type="button" id="returnButton" class="return-button" value="Новый запрос" onclick="window.location.href = 'index.jsp';">
    </div>
</body>
</html>