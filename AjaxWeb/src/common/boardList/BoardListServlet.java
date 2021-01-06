package common.boardList;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/Board")
public class BoardListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public BoardListServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BoardListDAO dao = new BoardListDAO();
		List<BoardListVO>list = dao.getBodList();
		String xml = "<dataset>";
		for(BoardListVO bod : list) {
			xml +="<record>";
			xml +="<boardNo>"+bod.getBoardNo()+"</boardNo>"
					+"<title>"+bod.getTitle()+"</title>"
					+"<content>"+bod.getContent()+"</content>"
					+"<writer>"+bod.getWriter()+"</writer>"
					+"<creationDate>"+bod.getCreationDate()+"</creationDate>";
				
			xml +="</record>";
			
		}
		xml +="</dataset>";
		
		response.getWriter().append(xml);
	
	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
