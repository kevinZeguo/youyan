package com.claude.wmall.commons.utils;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

/**
 * Description: 文件上传辅助类
 * @xf
 *
 */
public class uploadUtil {

	/**
	 * 文件上传
	 * @param request
	 * @param fileElementIdName 上传控件名 eg："fileElementId"
	 * @param filePath 文件保存路径  eg："upload/articleType"
	 * @return
	 */
	public static SuccessFailView uploadFile(HttpServletRequest request,String fileElementIdName,String  filePath) {
		String  filePureName="";
		//String fileElementId = request.getParameter("fileElementId");
		String fileElementId = request.getParameter(fileElementIdName);
		MultipartHttpServletRequest mulReq = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = mulReq.getFileMap();
		MultipartFile multipartFile = (MultipartFile) fileMap.get(fileElementId);
		if (!(multipartFile.getOriginalFilename() == null || ""
				.equals(multipartFile.getOriginalFilename()))) {
			System.out.println(multipartFile.getOriginalFilename());
			//String realPathDir = request.getSession().getServletContext().getRealPath("/upload/articleType");
			String realPathDir = request.getSession().getServletContext()
					.getRealPath("/"+filePath);
			
			//System.out.println(logoRealPathDir);
			File logoSaveFile = new File(realPathDir);
			if (!logoSaveFile.exists())
				logoSaveFile.mkdirs();
			String suffix = multipartFile.getOriginalFilename().substring(
					multipartFile.getOriginalFilename().lastIndexOf("."));
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddHHmmss");
			filePureName = dateformat.format(new Date())
					+ suffix;
			String fileName = realPathDir + File.separator + filePureName;
			File file = new File(fileName);
			try {
				multipartFile.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return new SuccessFailView(true, filePureName,"html");
	}
	
	/**
	 * 文件上传
	 * @param request
	 * @param fileElementIdName 上传控件名 eg："fileElementId"
	 * @param filePath 文件保存路径  eg："upload/articleType"
	 * @return
	 */
	public static String uploadFileReturnPath(HttpServletRequest request,String fileElementIdName,String  filePath) {
		String  filePureName="";
		String  fileName="";
		//String fileElementId = request.getParameter("fileElementId");
		String fileElementId = request.getParameter(fileElementIdName);
		MultipartHttpServletRequest mulReq = (MultipartHttpServletRequest) request;
		Map<String, MultipartFile> fileMap = mulReq.getFileMap();
		MultipartFile multipartFile = (MultipartFile) fileMap.get(fileElementId);
		if (!(multipartFile.getOriginalFilename() == null || ""
				.equals(multipartFile.getOriginalFilename()))) {
			System.out.println(multipartFile.getOriginalFilename());
			//String realPathDir = request.getSession().getServletContext().getRealPath("/upload/articleType");
			String realPathDir = request.getSession().getServletContext()
					.getRealPath("/"+filePath);
			
			//System.out.println(logoRealPathDir);
			File saveFile = new File(realPathDir);
			if (!saveFile.exists())
				saveFile.mkdirs();
			String suffix = multipartFile.getOriginalFilename().substring(
					multipartFile.getOriginalFilename().lastIndexOf("."));
			SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMddHHmmss");
			filePureName = dateformat.format(new Date())
					+ suffix;
		    fileName = realPathDir + File.separator + filePureName;
			File file = new File(fileName);
			try {
				multipartFile.transferTo(file);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return fileName;
	}
}
