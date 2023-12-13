
usage(){
    cat << USAGE >&2
        Options:
            --help                  for help
        Commands:
            start                   run backend systems
            generate:migration      create migration file
            migrate                 run migration
USAGE
exit 1
}


startServer(){
    echo "starting backend systems"
    docker-compose up --build
}

generateMigration(){
    if [ -n "$1" ];
        then
            echo "CREATING MIGRATION"
            docker exec -it node-server npm run migration:generate ./src/database/migration/$1
        else
            echo "no migration filename provided"
    fi
}

migrate(){
    echo "RUNNING DATABASE MIGRATION"
    docker exec -it node-server npm run migrate
}

if [ "$1" == "--help" ];
then
    usage
else
    if [ -n "$1" ];
    then
        case $1 in 
        "start")
            startServer
            ;;
        "generate:migration")
            generateMigration $2
            ;;
        "migrate")
            migrate
            ;;
        *)
            echo "unknown command $1"
            usage
            ;;
        esac
    else
        usage
    fi
fi 

