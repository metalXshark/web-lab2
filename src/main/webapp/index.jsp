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
            <div id="graph__wrapper" class="content__block">
                <canvas id="graph"></canvas>
            </div>
            <div id="request-form__wrapper" class="content__block" style="height: 355 px">
                <form id="request-form" class="savable-form" method="GET" action="${pageContext.request.contextPath}">
                    <div class="input-group button-group row-flex">
                        <h3 id="x-label" class="input-group__header">Изменение X<span id="error-message"></span></h3>
                        <button type="button" name="x" class="button-group__button value-button accent" value="-3">-3</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="-2">-2</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="-1">-1</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="0">0</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="1">1</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="2">2</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="3">3</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="4">4</button>
                        <button type="button" name="x" class="button-group__button value-button accent" value="5">5</button>
                        <input name="x" class="value-button__input save-value" type="hidden">
                    </div>
                    <div class="input-group column-flex">
                        <h3 id="y-label" class="input-group__header">Изменение Y</h3>
                        <div class="text_field">
                            <input id="text_field-1" type="text" name="y" class="text_field_input save-value" placeholder="(-3;3)">
                        </div>
                    </div>
                    <div class="input-group checkbox-group row-flex">
                        <h3 id="r-label" class="input-group__header">Изменение R</h3>
                        <input type="checkbox" name="r" class="checkbox-group__button" value="1"> 1
                        <input type="checkbox" name="r" class="checkbox-group__button" value="2"> 2
                        <input type="checkbox" name="r" class="checkbox-group__button" value="3"> 3
                        <input type="checkbox" name="r" class="checkbox-group__button" value="4"> 4
                        <input type="checkbox" name="r" class="checkbox-group__button" value="5"> 5
                        <input name="r" default="R" value="R" class="value-button__input save-value" type="hidden">
                    </div>
                    <div class="input-group row-flex">
                        <input type="submit" id="send-request" class="submit-button" value="Проверить" disabled>
                        <input type="button" id="clear-request" class="submit-button" value="Очистить">
                    </div>
                </form>
            </div>
            <div id="history__wrapper" class="content__block__result">
                <table id="history" class="table">
                    <%@ include file="jsp/table.jsp" %>
                </table>
            </div>
        </div>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/form.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/check.js"></script>
        <script type="text/javascript" src="${pageContext.request.contextPath}/js/script.js"></script>
    </body>
</html>