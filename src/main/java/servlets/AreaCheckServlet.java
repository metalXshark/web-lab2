package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@WebServlet(name = "AreaCheckServlet", value = "/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        BigDecimal x = new BigDecimal(req.getParameter("x"));
        BigDecimal y = new BigDecimal(req.getParameter("y"));
        int r = Integer.parseInt(req.getParameter("r"));

        if (validate(x, y, r, true)) {
            boolean result = inArea(x.doubleValue(), y.doubleValue(), r);
            LocalDateTime currentTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            String formattedTime = currentTime.format(formatter);
            long startTime = System.nanoTime();
            long endTime = System.nanoTime();
            long executionTime = (endTime - startTime) / 1000000;
            String executionTimeMs = executionTime + " мс";
            // Сохраняем результат в сессии
            List<String> pointData = Arrays.asList(
                    formattedTime,
                    executionTimeMs,
                    x.toString(),
                    y.toString(),
                    String.valueOf(r),
                    result ? "Попадание" : "Промах"
            );
            List<List<String>> results = (List<List<String>>) session.getAttribute("results");
            if (results == null) {
                results = new ArrayList<>();
            }
            results.add(pointData);
            session.setAttribute("results", results);
            req.getRequestDispatcher("/jsp/table.jsp").forward(req, resp);
        } else {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }
    }
    public static final Set<Integer> availableX = new HashSet<>(Arrays.asList(-3, -2, -1, 0, 1, 2, 3, 4, 5));
    public static final Set<Integer> availableR = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
    public static boolean validate(BigDecimal x, BigDecimal y, int r, boolean dot) {
        boolean isXValid = availableX.contains(x.intValue());
        boolean isYValid = y.compareTo(new BigDecimal("-3")) > 0 && y.compareTo(new BigDecimal("3")) < 0;
        return (dot && availableR.contains(r)
                || isXValid
                && isYValid
                && availableR.contains(r));
    }
    public static boolean inArea(double x, double y, double r) {
        boolean first_quarter_hit = false;
        boolean third_quarter_hit = false;
        boolean fourth_quarter_hit = false;

        if (x >= 0 && x <= r && y >= 0 && y <= r / 2) {
            first_quarter_hit = true;
        }

        if (x <= 0 && y <= 0 && x >= -r && y >= -r/2 && - x*r/2 - r/2 <= y) {
            third_quarter_hit = true;
        }

        if (x >= 0 && y <= 0 && x * x + y * y <= r * r) {
            fourth_quarter_hit = true;
        }

        return first_quarter_hit || third_quarter_hit || fourth_quarter_hit;
    }
}
