<?php

require_once( "./config.php" );

function getUserIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
        return $_SERVER['HTTP_CLIENT_IP'];
    }
    else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        return $_SERVER['REMOTE_ADDR'];
    }
}

if ( isset( $_REQUEST['user'] ) && isset( $_REQUEST['score'] ) )
{
    $sql = "INSERT INTO scores ( dateTime, name, score, IP ) VALUES (NOW(), :name, :score, :IP)";
    $q = $dbh->prepare($sql);
    $q->execute(array(':name'   => filter_var($_REQUEST['user'], FILTER_SANITIZE_STRING) ,
                      ':score'  => intval( $_REQUEST['score'] ),
                      ':IP'     => getUserIpAddr() )
    );
}


if ( isset( $_GET['highscores']) )
{
    $sql = "SELECT      dateTime,
                        name,
                        score
            FROM        `scores`
            ORDER BY    `score`     DESC ,
                        `dateTime`  DESC
            LIMIT       8";
    $json = array();

    foreach ( $dbh->query($sql) as $row)
    {
        $json[] = $row;
    }

    print json_encode($json);
}
