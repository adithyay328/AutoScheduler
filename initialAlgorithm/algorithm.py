import time
import datetime

class BreakConfig:
    def __init__(self, breakFrequency, minimumWorkTime):
        self.__breakFreq = breakFrequency
        self.__minWorkTime = minimumWorkTime

    @property
    def breakFrequency(self):
        return self.__breakFreq

    @property
    def minimumWorkTime(self):
        return self.__minWorkTime

class ScheduleConfig:
    def __init__(self, breakConfig, wakeTime : time.time, sleepTime : time.time, breakInBetweenTasks : datetime.timedelta):
        self.__breakConfig = breakConfig
        self.__wakeTime = wakeTime
        self.__sleepTime = sleepTime
        self.__breakInBetweenTasks = breakInBetweenTasks
    
    @property
    def wakeTime(self):
        return self.__wakeTime

    @property
    def sleepTime(self):
        return self.__sleepTime
    
    @property
    def breakInBetweenTasks(self):
        return self.__breakInBetweenTasks
    
    @property
    def breakConfig(self):
        return self.__breakConfig


#Concrete time allocations are all time allocs that have been assigned
#a real time in the current day

#Expectation is that all break time is inputted through the constructor of this object. Makes the schedule
#object cleaner by not having to worry about breaks
class ConcreteTimeAlloc:
    def __init__(self, startDateTime : datetime.datetime, endDateTime : datetime.datetime, title : str, breakTime : datetime.timedelta):
        self.__startDateTime = startDateTime
        self.__endDateTime = endDateTime
        self.__title = title
        self.__breakTime = breakTime
    
    @property
    def startDateTime(self):
        return self.__startDateTime
    
    @property
    def endDateTime(self):
        return self.__endDateTime

    @property
    def breakTime(self):
        return self.__breakTime
    
    def isOverlapping(self, otherConcreteAlloc) -> bool:
        if(otherConcreteAlloc.startDateTime < self.__startDateTime):
            return otherConcreteAlloc.endDateTime >= self.__startDateTime
        elif(otherConcreteAlloc.startDateTime > self.__startDateTime):
            return self.__endDateTime >= otherConcreteAlloc.startDateTime
        else:
            return True
    
    def getDuration(self) -> datetime.timedelta:
        return self.__endDateTime - self.__startDateTime

#Tasks need to be broken according to their timing rules, and then converted into concrete allocs
class Tasks:
    def __init__(self, title : str, priority : int, predictedTimeRemaining : int, dueDate : datetime.datetime, maxWorkTimePerStretch : int, \
        maxWorkTimePerDay : int):

        self.__dueDate = dueDate
        self.__title = title
        self.__priority = priority
        self.__predictedTimeRemaining = predictedTimeRemaining
        self.__maxWorkTimePerStretch = maxWorkTimePerStretch
        self.__maxWorkTimePerDay = maxWorkTimePerDay


class Schedule:
    def __init__(self):
        self.__concreteAllocs = []
    
    def addConcreteAlloc(self, concreteAlloc : ConcreteTimeAlloc):
        self.__concreteAllocs.append(concreteAlloc)

        #Adding in the break, as prescribed by the concrete alloc
        oneSecondTimeDelta = datetime.timedelta(seconds=1)
        breakStartDateTime = concreteAlloc.endDateTime + oneSecondTimeDelta
        breakEndDateTime = breakStartDateTime + concreteAlloc.breakTime

        breakConcreteAlloc = ConcreteTimeAlloc(breakStartDateTime, breakEndDateTime, "Break", datetime.timedelta())

        self.__concreteAllocs.append(breakConcreteAlloc)

        self.__concreteAllocs.sort(key=lambda alloc : alloc.startDateTime)

        for i in range(len(self.__concreteAllocs) - 1):
            if(self.__concreteAllocs[i].isOverlapping(self.__concreteAllocs[i + 1])):
                raise ValueError