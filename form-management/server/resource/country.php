<?php
header("content-type:text/html; charset=utf-8");

use Tonic\Resource,
    Tonic\Response,
    Tonic\ConditionException,
    opmysql;

/**
 * The obligitory Hello World example
 *
 * The @uri annotation routes requests that match that URL to this resource. Multiple
 * annotations allow this resource to match multiple URLs.
 *
 * @uri /country
 * @uri /country/:id
 */
class Country extends Resource
{
    /**
     * @method GET
     * @provides application/json
     * @return str
     */
    public function getAllUser($id =0)
    {
      $obj=new opmysql('localhost','root','','formapp');
    	mysql_query("set names UTF8");
    	//echo mb_convert_encoding("你是我的好朋友","UTF-8","GBK");
    	//echo mb_convert_encoding("你是我的好朋友","GBK","UTF-8");
    	$arr = array();
        if($id==0)
    	{
	        $query_insert="SELECT * FROM country;";
	        $obj->mysql_query_rst($query_insert);
	        
	        while($row = mysql_fetch_array($obj->result,MYSQL_ASSOC)){   //查询出来sql
	          $arr[] = $row;                                   //将查询出来的结果赋给数组$arr
	        }
	        
	        $str = json_encode($arr);  
	        //$str=mb_convert_encoding($str,"UTF-8","GBK");
      		return $str;                          //将数组转化为json格式的字符串    	
    	}else{
      //
          $query_insert="SELECT * FROM country where id='".$id."';";
          $obj->mysql_query_rst($query_insert);
          
          $arr = array();
           if($obj->result){
           $row = mysql_fetch_array($obj->result,MYSQL_ASSOC);
            $arr[] =$row;
           }else{
              return "have no data";
           }
           $str = json_encode($arr);
           $str=substr($str,1,strlen($str)-2);
           //$str=mb_convert_encoding($str,"UTF-8","GBK");
           return urldecode($str);
      }
      //return "hello";
        
    }

    /**
     * All HTTP methods are supported. The @accepts annotation makes method only match if the
     * request body content-type matches.
     *
     * curl -i -H "Content-Type: application/json" -X POST -d '{"hello": "computer"}' http://localhost/www/tonic/web/hello.json
     *
     * @method POST
     * @provides application/json
     * @return Response
     */
    public function feedTheComputer()
    {
    	parse_str($this->request->data);
    	/*echo "<br>";
    	//echo $name;
    	//echo "<br>";
    	//echo $age;
    	//echo "<br>";
    	//echo "INSERT INTO test(Name,age)  VALUES('".$name."' , ".$age.");";*/
    	$obj=new opmysql('localhost','root','','formapp');
    	mysql_query("set names UTF8");
    	$query_insert="INSERT INTO test(Name,age)  VALUES('".$name."' , ".$age.");";
    	$success=$obj->uidRst($query_insert);
    	echo $success;
    	echo '<br>';
    	return new Response(200);
        //return new Response(200, $this->request->data);
        
    }

}
