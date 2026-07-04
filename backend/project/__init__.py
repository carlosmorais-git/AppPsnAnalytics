# Iniciar APScheduler quando Django inicializar
# Apenas em produção (runserver não precisa)
# import os
# import sys

# # Verificar se não é comando de migração/shell/etc
# RUN_MAIN = os.environ.get('RUN_MAIN')
# COMMAND = sys.argv[1] if len(sys.argv) > 1 else ''

# # Iniciar scheduler apenas no runserver (e apenas uma vez - RUN_MAIN evita duplicação)
# if COMMAND == 'runserver' and RUN_MAIN == 'true':
#     start_scheduler()
