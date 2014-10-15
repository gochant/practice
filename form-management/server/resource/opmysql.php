<?php

class opmysql
{
	private $host='localhost';
	private $name='root';
	private $pwd='root';
	private $dbase='forms';
	private $conn='';
	public $result='';
	private $msg='';
	private $filds='';
	private $fildsNum=0;
	private $rowNum=0;
	
    //构造函数
    public function __construct($host='localhost:3306', $name='root',$pwd='',$dbase='formapp')
    {

        $this->host = $host;
    	//echo '<br>'.$host.'<br>';
    	$this->name = $name;
       	$this->pwd = $pwd;
       	$this->dbse=$dbase;        
        $this->init_conn();	  	    	
    }
    //连接函数
    private function init_conn(){
    	$this->conn=@mysql_connect($this->host,$this->name,$this->pwd);
    	$select_db=@mysql_select_db('forms',$this->conn);
    	//echo "$select_db=".$select_db;
    	if ($select_db) {
    	//echo "<br/>chonodsed<br/>";
   		}
    
    	mysql_query("set names utf8");
    	
    }
	//操作函数
		//查询
	function mysql_query_rst($sql){
		if ($this->conn=='') {
			$this->init_conn();
		}
		$this->result=@mysql_query($sql,$this->conn);
		
	}
	//操作函数
		//增删改
	function uidRst($sql){
		if ($this->conn=='') {
			$this->init_conn();
			echo 'link rwong';
		}
		//echo '<br>'.$sql.'<br>';
		$this->result=@mysql_query($sql,$this->conn);
		//echo "<br>result is :".$this->result.'<br>';
		if (mysql_errno()==0) {
			$this->rowsNum=@mysql_affected_rows();
			return $this->rowsNum;	
		}
		return 0;
			
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
