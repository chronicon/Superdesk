'''
Created on Mar 5, 2012

@package: internationalization
@copyright: 2011 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Gabriel Nistor

Contains the SQL alchemy meta for source API.
'''

from . import meta
from ..api.file import File
from ally.support.sqlalchemy.mapper import mapperModel
from sqlalchemy.schema import Table, Column, UniqueConstraint
from sqlalchemy.types import String, DateTime
from sqlalchemy.dialects.mysql.base import INTEGER

# --------------------------------------------------------------------

component = Column('component', String(255), nullable=True, key='Component')
plugin = Column('plugin', String(255), nullable=True, key='Plugin')
path = Column('path', String(255), nullable=False, key='Path')

table = Table('inter_file', meta,
              Column('id', INTEGER(unsigned=True), primary_key=True, key='Id'),
              component, plugin, path,
              Column('last_modified', DateTime, nullable=False, key='LastModified'),
              UniqueConstraint(component, plugin, path, name='component_plugin_path_UNIQUE'),
              mysql_engine='InnoDB'
              )

File = mapperModel(File, table)
