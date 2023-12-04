package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

@WebServlet(name = "ControllerServlet", value = "", loadOnStartup = 0)
@MultipartConfig
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (Objects.nonNull(req.getParameter("function"))) {
            log(String.format("Receiving \"%s\" request from %s", req.getParameter("function"), req.getSession().getId()));
            if (req.getParameter("function").equals("clear")) {
                // Очистка таблицы в HTTP-сессии
                HttpSession session = req.getSession();
                session.setAttribute("results", new ArrayList<>());
                log("Cleared table in HTTP session!");
                resp.getWriter().write("");
                resp.setStatus(HttpServletResponse.SC_OK);
            } else {
                resp.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
            }
        } else {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (Objects.nonNull(req.getParameter("function"))) {
            log(String.format("Receiving \"%s\" request from %s", req.getParameter("function"), req.getSession().getId()));
            if (req.getParameter("function").equals("check")) {
                req.getRequestDispatcher("/check").forward(req, resp);
            } else {
                resp.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
                req.getRequestDispatcher("/index.jsp").forward(req, resp);
            }
        } else {
            req.getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
}
