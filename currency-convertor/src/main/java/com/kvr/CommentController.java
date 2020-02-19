package com.kvr;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentController {
	private List<String> comment=new LinkedList<>();

	@RequestMapping(value = "/api/v1/comment/", method = RequestMethod.GET)
	public List<String> getComment() {
		return this.comment;
	}

	@RequestMapping(value = "/api/v1/comment", method = RequestMethod.POST)
	public void updateComment(@RequestBody String comment) {
		System.out.println(comment);
		this.comment.add(comment);
	}

}
