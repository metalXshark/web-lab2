package servlets.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Objects;

@WebFilter(filterName = "UrlFilter")
public class UrlFilter extends HttpFilter {
    @Override
    public void doFilter(HttpServletRequest req, HttpServletResponse resp, FilterChain chain) throws IOException, ServletException {
        // Allow access to static resources (e.g., CSS, JavaScript, JSP files)
        if (req.getRequestURI().matches(".*(css|js|jsp)")) {
            chain.doFilter(req, resp);
            return;
        }
        // Control access to specific servlets
        if (!Objects.equals(req.getHttpServletMapping().getServletName(), "ControllerServlet")) {
            if (req.getHttpServletMapping().getMatchValue().isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            } else {
                resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            }
            req.getRequestDispatcher("/jsp/error.jsp").forward(req, resp);
            return;
        }
        try {
            chain.doFilter(req, resp);
        } catch (ServletException | IOException e) {
            req.getServletContext().log("Caught exception", e);
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            req.getRequestDispatcher("/jsp/error.jsp").forward(req, resp);
        }
    }
}