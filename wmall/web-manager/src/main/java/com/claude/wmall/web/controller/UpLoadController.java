package com.claude.wmall.web.controller;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.util.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/upload")
public class UpLoadController {

	@RequestMapping(value = "image", method = RequestMethod.POST)
	@ResponseBody
	public void image(HttpServletRequest request, HttpServletResponse response,HttpSession session,
			@RequestParam("filedata") MultipartFile file) throws Exception {

		// 将图片按日期分开存放，方便管理
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM_dd");
		String strDate = sdf.format(new Date());
		final String path_segment = "/upload/images/" + strDate;

		// 存放到web根目录下,如果日期目录不存在，则创建,
		// 注意 request.getRealPath("/") 已经标记为不推荐使用了.
		final String path = session.getServletContext().getRealPath("/")
				+ path_segment;
		File dir = new File(path);
		if (!dir.exists()) {
			dir.mkdirs();
		}
		// logger.info(path);

		// 以下是真正的上传部分
		String error = "";
		// 取得原文件名
		String originName = file.getOriginalFilename();
		// 取得文件后缀
		String fileExt = originName.substring(originName.lastIndexOf(".") + 1);
		// 按时间戳生成图片文件名
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyyMMddHHmmss");
		String strDate2 = sdf2.format(new Date());
		String picture = strDate2 + "." + fileExt;
		try {

			IOUtils.copy(file.getInputStream(), new FileOutputStream(new File(
					dir, picture)));

		} catch (Exception e) {
			// logger.error("error:", e);
			error = e.getMessage();
		}

		// 将图片路径按xheditor要求的json格式字符串返回
		/*String url = "http://" + request.getServerName() // 服务器地址
				+ ":" + request.getServerPort() // 端口号
				+ request.getContextPath() // 项目名称
				+ path_segment + "/" + picture; // upload/images/2012/11_09/20121109223012.jpg
		//http://localhost:8080/etp/upload/images/2016/04_25/20160425182233.jpg
		*/		
		String url = ".."+ path_segment + "/"+ picture; 
		
		 printInfo(response, error, url);
		
	}
	/**
	 * 使用I/O流输出 json格式的数据
	 * @param response
	 * @param err
	 * @param newFileName
	 * @throws IOException
	 */
	public void printInfo(HttpServletResponse response, String err, String newFileName) throws IOException {
		PrintWriter out = response.getWriter();
		//String filename = newFileName.substring(newFileName.lastIndexOf("/") + 1);
		out.println("{\"err\":\"" + err + "\",\"msg\":\"" + newFileName + "\"}");
		out.flush();
		out.close();
	}
}
